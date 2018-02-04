angular.module('myApp').controller('adminController', [ '$routeParams', '$location', '$route', '$scope', 'ItemService', 'OrderService', function( $routeParams, $location, $route, $scope, ItemService, OrderService ){

	$scope.item = {

		name: "",
		price: 0,
		id: 0
	}

	ItemService.getItems().then( function( allItems ){

		$scope.allItems = allItems
	})


	$scope.createItem = function( item ){

		ItemService.createItem( item ).then( function( createdItem ){ 

            alert( "Menu item " + createdItem.data.name + " added successfully" );
            $scope.allItems.push( createdItem.data )

        }, function(){

            alert( "Item not added" );
        })
	}


}]);