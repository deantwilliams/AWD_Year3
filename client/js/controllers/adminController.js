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
		console.log("itemid: " + item.id);
		
		// Check whether an item with the same id exists.
		// If it exists, an new menu item cannot be added 
		var itemWithId = $scope.allItems.findIndex(x => x.id == item.id);
		
		if(itemWithId != -1){
			// Item with provided id already exists 			
            alert( "Cannot add item with a duplicate id." );
		}else{
			
		ItemService.createItem( item ).then( function( createdItem ){ 

            alert( "Menu item " + createdItem.data.name + " added successfully" );
            $scope.allItems.push( createdItem.data )

        }, function(){

            alert( "Item not added" );
        })
		}
	}


	$scope.removeItem = function (item) {
		item.deleted = true;
		console.log(item._id);

		ItemService.updateItem(item).then(function () {

			var recordToDelete = $scope.allItems.findIndex(x => x._id == item._id);

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