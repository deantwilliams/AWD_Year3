angular.module('myApp').controller('waiterController', [ '$routeParams', '$location', '$route', '$scope', 'ItemService', 'OrderService', function( $routeParams, $location, $route, $scope, ItemService, OrderService ){

	$scope.order = {

		tableNumber: 0,
		numberOfPeople: 1,
		items: []
	}

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


	ItemService.getItems().then( function( allItems ){

		$scope.allItems = allItems
	})

	var isTableAvailable = function( tableNumber ){

		OrderService.getOrdersForTable( tableNumber ).then( function( orders ){

			for( x in orders ){

				if( orders[x].paid === false ){

					$scope.tableAvailable[tableNumber] = false

				}

			}


		})

	}

	var checkTableAvailability = function(){

		for( var i = 1; i<9; i++){

			isTableAvailable( i )

		}

	}


	checkTableAvailability();
	
s

	$scope.selectTable = function( tableNumber ){

		$scope.order.tableNumber = tableNumber
		$scope.showOrderForm = true;
	}

	$scope.addItemToOrder = function( selectedItem ){

		if ( false ){
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

			resetForm();
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




}]);