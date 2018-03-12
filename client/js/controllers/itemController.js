angular.module('myApp').controller('itemController', function( $scope, $routeParams, $location,  ItemService, UserService ){

	ItemService.getItems().then( function( allItems ){
		$scope.allItems = allItems
	})

 	var itemId = $routeParams.id;


    if( itemId ){

      ItemService.getItem( itemId ).then( function( item ){

        $scope.item = item;

      }).catch( function( err ){

      });       
        
    }

    $scope.updateItem = function(){

	// Check whether an item with the same id exists.
		// If it exists, an new menu item cannot be added 
		var itemWithId = $scope.allItems.findIndex(x => x.id == $scope.item.id);
		
		console.log("id: " + itemId);
		
		if(itemWithId != -1 && itemId != $scope.item.id){
			// Item with provided id already exists 			
           $scope.errorMessage = "This ID is already in use, please use a different one.";
		}else{

		ItemService.updateItem( $scope.item ).then( function(){

			$location.path("/admin");

		}, function(){

		})
		}
    }

})
