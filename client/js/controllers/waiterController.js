angular.module('myApp').controller('waiterController', function( $scope, ItemService, OrderService, SocketService ){

	$scope.order = {

		tableNumber: 0,
		numberOfPeople: 1,
		items: []
	}


	ItemService.getItems().then( function( allItems ){

		$scope.allItems = allItems
	})


	var checkTableAvailability = function(){

		$scope.tableAvailable = [ 

			false, //index 0
			
			true, 
			true, 
			true, 
			true, 
			true, 
			true, 
			true, 
			true
		]

		OrderService.getUnpaidOrders( ).then( function( orders ){

			for( x in orders ){

				$scope.tableAvailable[ orders[x].tableNumber ] = false

			}

			$scope.tablesChecked = true

		})

	}


	checkTableAvailability();
	

	$scope.selectTable = function( tableNumber ){

		$scope.order.tableNumber = tableNumber
		$scope.showOrderForm = true;
	}

	$scope.addItemToOrder = function( selectedItem ){

		if(!selectedItem){
			alert( "Please select a menu item to add to the order" )
		}else{


			var index = $scope.order.items.findIndex(x => x.item._id == selectedItem._id)

			if( index != -1 ){

				$scope.order.items[index].quantity += 1

			}else{

				var itemToAdd = { item: selectedItem, quantity: 1 }
				$scope.order.items.push( itemToAdd );
			}

		}

		
	}

	$scope.removeItemFromOrder = function( selectedItem ){

		var items = $scope.order.items
        items.splice( items.indexOf( selectedItem ), 1 ) 
	}

	$scope.createOrder = function( order ){

		if( order.items.length > 0){

			OrderService.createOrder( order ).then( function( createdOrder ){ 

				$scope.resetForm();
	            alert( "Order sent to the kitchen" );

	        }, function(){

	            alert( "Order not sent to the kitchen" );
	        })

		}else{

			alert("You can't place an order with no food or drinks selected")
		}

		
	}

	$scope.resetForm = function(){

		$scope.order = {

			tableNumber: 0,
			numberOfPeople: 1,
			items: []
		}
		$scope.showOrderForm = false;

	}

	SocketService.on('item.created', function( item ){
		$scope.$applyAsync( function(){

			$scope.allItems.push( item ); 

        });
    });

    SocketService.on('item.updated', function( item ){
		$scope.$applyAsync( function(){

			var index = $scope.allItems.findIndex(x => x._id == item._id)
			$scope.allItems[index] = item

        });
    });

	SocketService.on('order.added', function( order ){
		OrderService.getOrder(order._id).then(function( newOrder ){
			$scope.$applyAsync( function(){

				$scope.tableAvailable[ newOrder.tableNumber ] = false; 

            });
		})
    });

    SocketService.on('order.paid', function( order ){

		OrderService.getOrder(order._id).then(function( orderPaid ){

			$scope.$applyAsync( function(){

				$scope.tableAvailable[ orderPaid.tableNumber ] = true; 

            });
		})
    });
   
    $scope.$on( '$destroy', function( event ){
      SocketService.getSocket().removeAllListeners();
    });




});