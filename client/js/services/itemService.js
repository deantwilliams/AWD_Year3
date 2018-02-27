angular.module( 'myApp' ).factory( 'ItemService', [ '$q', '$timeout', '$http', function( $q, $timeout, $http ){

    return ({
      getItems: getItems,
      createItem: createItem,
      updateItem: updateItem,
    });


    function createItem( item ){
      return $http({ method: 'POST', url: '/api/items', data: item });
    }

    function updateItem( item ){
      return $http({ method: 'PATCH', url: '/api/items/'+item._id, data: item });
    }


    function getItems(){
      
      var deferred = $q.defer();

      $http.get( '/api/items' ).then(
        function successCallback( res ) {

            if( res.data.items ){
              deferred.resolve( res.data.items );
            } else {
              deferred.reject();
            }

        }, function errorCallback( res ){

          deferred.reject();
        }
      );

      return deferred.promise;
    }


}]);