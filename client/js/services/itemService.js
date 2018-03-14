angular.module( 'myApp' ).factory( 'ItemService', function( $q, $timeout, $http ){

    return ({
      getItem: getItem,
      getItems: getItems,
      createItem: createItem,
      updateItem: updateItem,
    });

    function getItem( id ){

      var deferred = $q.defer();

      $http.get( '/api/items/'+id ).then(
        function successCallback( res ) {

            if( res.data ){
              deferred.resolve( res.data );
            } else {
              deferred.reject();
            }

        }, function errorCallback( res ){

          deferred.reject();
        }
      );

      return deferred.promise;
    }


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


});