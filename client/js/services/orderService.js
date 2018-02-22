angular.module( 'myApp' ).factory( 'OrderService', [ '$q', '$timeout', '$http', function( $q, $timeout, $http ){

    return ({
      getOrders: getOrders,
      getOrder: getOrder,
      getUnpaidOrders: getUnpaidOrders,
      createOrder: createOrder,
      deleteOrder: deleteOrder,
      updateOrder: updateOrder,
      completeOrder: completeOrder,
	  orderPaid: orderPaid
    });


    function createOrder( order ){
      return $http({ method: 'POST', url: '/api/orders', data: order });
    }

    function deleteOrder( ID ){
      return $http({ method: 'DELETE', url: '/api/orders/'+ID });
    }


    function getOrder( id ){

      var deferred = $q.defer();

      $http.get( '/api/orders/'+id ).then(
        function successCallback( res ) {

            if( res.data.order ){
              deferred.resolve( res.data.order );
            } else {
              deferred.reject();
            }

        }, function errorCallback( res ){

          deferred.reject();
        }
      );

      return deferred.promise;
    }


    function getOrders(){
      
      var deferred = $q.defer();

      $http.get( '/api/orders' ).then(
        function successCallback( res ) {

            if( res.data.orders ){
              deferred.resolve( res.data.orders );
            } else {
              deferred.reject();
            }

        }, function errorCallback( res ){

          deferred.reject();
        }
      );

      return deferred.promise;
    }


    function getUnpaidOrders( ){
      
      var deferred = $q.defer();

      $http.get( '/api/orders/unpaid' ).then(
        function successCallback( res ) {

            if( res.data.orders ){
              deferred.resolve( res.data.orders );
            } else {
              deferred.reject();
            }

        }, function errorCallback( res ){

          deferred.reject();
        }
      );

      return deferred.promise;
    }


	function updateOrder(order){
		return $http({ method: 'PATCH', url: '/api/orders/'+order._id, data: order });
	}
	
	function completeOrder(order){
		return $http({ method: 'PATCH', url: '/api/order/'+order._id, data: 1 });
	}
	
	function orderPaid(order){
		return $http({ method: 'PATCH', url: '/api/orders/'+order._id, data: order });
	}
}]);