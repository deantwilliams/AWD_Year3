angular.module('myApp').controller('waiterController', [ '$routeParams', '$location', '$route', '$scope', 'ItemService', 'OrderService', 'SocketService', function( $routeParams, $location, $route, $scope, ItemService, OrderService, SocketService ){

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

		//if selectedItem is already in the order

		if( false ){

			//prompt user to edit quantity instead

		}else{
			var itemToAdd = { item: selectedItem, quantity: 1 }
			$scope.order.items.push( itemToAdd );
		}

	}

	$scope.removeItemFromOrder = function( selectedItem ){

		var items = $scope.order.items
        items.splice( items.indexOf( selectedItem ), 1 ) 
	}

	$scope.createOrder = function( order ){

		OrderService.createOrder( order ).then( function( createdOrder ){ 

			$scope.resetForm();
            alert( "Order sent to the kitchen" );

        }, function(){

            alert( "Order not sent to the kitchen" );
        })
	}

	$scope.resetForm = function(){

		$scope.order = {

			tableNumber: 0,
			numberOfPeople: 1,
			items: []
		}
		$scope.showOrderForm = false;

	}

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




}]);