var Order = require( '../models/orderModel' );

exports.list = function( req, res ){

    Order.find({ })
    .populate('items.item')
    .exec( function( err, orders ){

        if( err ){
            console.log( "error: " + err );
            return res.status( 500 );
        }
        
        res.json({ orders: orders });
            
    })
}

exports.create = function( req, res ){

    //no need to specify date or paid, date defaults to "Date.now" in the model, and paid is always false at time of creation 
    var order = new Order({ tableNumber: req.body.tableNumber, items: req.body.items });

    order.save( function( err ){
        if( err ){
            console.log( "error: " + err );
            return res.status(500).json({ errors: "Could not create order" });
        } 

        var socketio = req.app.get('socketio');
        socketio.sockets.emit('order.added', order);

        res.status( 201 ).json( order );

    });
};

exports.delete = function( req, res ){

    var id = req.params.id;

    Order.findByIdAndRemove(id, (err, order) => {  

        if( err ){
            console.log( "error: " + err );
            return res.status(500).json({ errors: "Could not delete order" });
        } 

        console.log("order deleted: " + order);
        res.status( 200 ).json( order );
    });

};


exports.lookupOrder = function(req, res) {

    var id = req.params.id;

    Order.findOne({ '_id': id })
	.populate('items.item')
    .exec( function( err, order ){

        if( err ){  
            console.log( err ); 
            return res.status(500).json({ errors: "Could not retrieve order" });
        }

        if( !order ){
            console.log( "No order found" );
            return res.status(404).json({ errors: "No such order" });
        } 
        
        res.json({order:order});
    });
  
}

exports.updateOrder = function(req,res) {
	var id = req.params.id;
	
	Order.findByIdAndUpdate(id, { $set: req.body }, {new: true}, (err, order) => {  

        if( err ){
            console.log( "error: " + err );
            return res.status(500).json({ errors: "Could not update order" });
        } 

        res.status( 200 ).json({ message: "Order updated!", order });
    });
}



exports.getUnpaidOrders = function(req, res) {

    Order.find({ 'paid': false })
    .exec( function( err, orders ){

        if( err ){  
            console.log( err ); 
            return res.status(500).json({ errors: "Could not retrieve order" });
        }

        if( !orders ){
            console.log( "No order found" );
            return res.status(404).json({ errors: "No such order" });
        } 
        
        res.json({orders:orders});
    });
  
}

exports.orderPaid = function(req,res) {
	var id = req.params.id;
	Order.findByIdAndUpdate(id, { $set: req.body }, {new: true}, (err, order) => {  
		if( err ){
            console.log( "error: " + err );
            return res.status(500).json({ errors: "Could not pay for order" });
        } 

		var socketio = req.app.get('socketio');
        socketio.sockets.emit('order.paid', order);
        res.status( 200 ).json({ message: "Payment Complete!", order });
    });
}