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


	$scope.removeItem = function (itemId) {

		console.log(itemId);

		ItemService.deleteItem(itemId).then(function () {

			var recordToDelete = $scope.allItems.findIndex(x => x._id == itemId);

			$scope.allItems.splice(recordToDelete, 1);

		}, function () {

		})
	}


	function findArrayIndexOfItemId(itemId) {
		return $scope.allItems.id == itemId;
	}

	$scope.hoverIn = function () {
		this.hoverEdit = true;
	};

	$scope.hoverOut = function () {
		this.hoverEdit = false;
	};

	$scope.logOut = function () {
		UserService.logOut();
		console.log("loggedIn admin: " + localStorage.isLoggedIn);
	}


}]);