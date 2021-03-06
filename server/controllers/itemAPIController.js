var Item = require( '../models/itemModel' );

exports.update = function(req,res) {
	var id = req.params.id;
	
	Item.findByIdAndUpdate(id, { $set: req.body }, {new: true}, (err, item) => {  

        if( err ){
            console.log( "error: " + err );
            return res.status(500).json({ errors: "Could not mark item as deleted" });
        } 

        var socketio = req.app.get('socketio');
        socketio.sockets.emit('item.updated', item);

        res.status( 200 ).json({ message: "Item taken off the menu!", item });
    });
}


exports.list = function( req, res ){

    Item.find({ }, function( err, items ){

        if( err ){
            console.log( "error: " + err );
            return res.status( 500 );
        }
        
        res.json({ items: items });
            
    })
}

exports.create = function( req, res ){

    var item = new Item({ id: req.body.id, name: req.body.name, price: req.body.price });

    item.save( function( err ){
        
        if( err ){
            console.log( "error: " + err );
            return res.status(500).json({ errors: "Could not create item" });
        } 


        var socketio = req.app.get('socketio');
        socketio.sockets.emit('item.created', item);
        
        res.status( 201 ).json( item );

    });
};

exports.lookupItem = function(req, res) {

    var id = req.params.id;

    Item.findOne({ 'id': id }, function( err, item ){

        if( err ){  
            console.log( err ); 
            return res.status(500).json({ errors: "Could not retrieve item" });
        }

        if( !item ){
            console.log( "No item found" );
            return res.status(404).json({ errors: "No such item" });
        } 
        
        res.json(item);
    });
  
}
