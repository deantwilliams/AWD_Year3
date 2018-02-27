angular.module('myApp').controller('adminController', [ '$scope', 'ItemService', 'OrderService', function( $scope, ItemService, OrderService ){

	$scope.item = {

		name: "",
		price: 0,
		id: 0
	}

	ItemService.getItems().then( function( allItems ){
		$scope.allItems = allItems
	})


	$scope.createItem = function( item ){
		
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
		ItemService.updateItem(item)
	}


	// function findArrayIndexOfItemId(itemId) {
	// 	return $scope.allItems.id == itemId;
	// }

	$scope.hoverIn = function () {
		this.hoverEdit = true;
	};

	$scope.hoverOut = function () {
		this.hoverEdit = false;
	};

	$scope.logOut = function () {
		UserService.logOut();
	}


}]);