var app = angular.module('myApp');

app.controller('kitchenController', [ '$routeParams', '$location', '$route', '$scope', '$interval', 'ItemService', 'OrderService', function( $routeParams, $location, $route, $scope, $interval, ItemService, OrderService){

	$scope.title = "Kitchen"
	
	OrderService.getOrders().then(function (allOrders){
		if(allOrders == null || allOrders.length == 0)
		{
			$scope.showOrdersKitchen = false;
			$scope.hideOrdersKitchen = true;
		}
		else
		{
			$scope.showOrdersKitchen = true;
			$scope.hideOrdersKitchen = false;
			$scope.allOrders = allOrders;
		}
	})
	
	/*SocketService.on('order.added', function( order ){

                $scope.$applyAsync( function(){

                    $scope.allOrders.push( order );    
              
                });
                
        });
   
    $scope.$on( '$destroy', function( event ){
      SocketService.getSocket().removeAllListeners();
    });*/
	
	var tick = function(){
		$scope.now = Date.now();
	}
	tick();
	$interval(tick,1000);
}]);

app.filter("waitTime", function(){
		return function(placed){
			var placedAt = new Date(placed);
			var current = new Date();
			
			var diff = Math.abs(current.getTime() - placedAt.getTime());
			var hours = Math.floor(diff/(60*60*1000));
			var mins = ((diff/(60*1000))%60).toFixed(0);
			var secs = ((diff%60000)/1000).toFixed(0);

			return ((hours < 10) ? ("0"+hours) : hours) 
			+ ":" + ((mins < 10) ? ("0"+mins) : mins)
			+ ":" + ((secs < 10) ? ("0"+secs) : secs);
		}
	})

	