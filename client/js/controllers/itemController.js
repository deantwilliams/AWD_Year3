angular.module('myApp').controller('itemController', function( $scope, $routeParams, $location,  ItemService, UserService ){

 	var itemId = $routeParams.id;

    $scope.error = {}

    if( itemId ){

      ItemService.getItem( itemId ).then( function( item ){

      	console.log(JSON.stringify(item, null, 2))

        $scope.item = item;

      }).catch( function( err ){

      });       
        
    }

    $scope.updateItem = function(){


		ItemService.updateItem( $scope.item ).then( function(){

			$location.path("/admin");

		}, function(){

		})

    }

})
