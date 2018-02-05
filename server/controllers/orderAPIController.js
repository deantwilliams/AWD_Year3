var Order = require( '../models/orderModel' );

exports.list = function( req, res ){

    Order.find({ }, function( err, orders ){

        if( err ){
            console.log( "error: " + err );
            return res.status( 500 );
        }
        
        res.json({ orders: orders });
            
    })
}

exports.create = function( req, res ){

    var order = new Order({ tableNumber: req.body.tableNumber, items: req.body.items, price: req.body.price, paid: false, placed: Date.Now });

    order.save( function( err ){
        if( err ){
            console.log( "error: " + err );
            return res.status(500).json({ errors: "Could not create order" });
        } 

        console.log("order added: " + order);
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


exports.lookupOrder = function(req, res, next) {

    var id = req.params.id;

    Order.findOne({ '_id': id }, function( err, order ){

        if( err ){  
            console.log( err ); 
            return res.status(500).json({ errors: "Could not retrieve order" });
        }

        if( !order ){
            console.log( "No order found" );
            return res.status(404).json({ errors: "No such order" });
        } 
        
        req.order = order;
        next();
    });
  
}
