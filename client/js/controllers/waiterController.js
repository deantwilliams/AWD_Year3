angular.module('myApp').controller('waiterController', [ '$routeParams', '$location', '$route', '$scope', 'ItemService', 'OrderService', function( $routeParams, $location, $route, $scope, ItemService, OrderService ){

	$scope.order = {

		tableNumber: 0,
		numberOfPeople: 1,
		items: []
	}

	ItemService.getItems().then( function( allItems ){

		$scope.allItems = allItems
	})



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


	var resetForm = function(){

		$scope.order = {

			tableNumber: 0,
			numberOfPeople: 1,
			items: []
		}
		$scope.showOrderForm = false;

	}


}]);