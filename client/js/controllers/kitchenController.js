var app = angular.module('myApp');

app.controller('kitchenController', function( $scope, $interval, ItemService, OrderService, SocketService){

	$scope.title = "Kitchen"
	$scope.allOrders = [];

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
	
	$scope.strikeItemFromOrder = function(idx)
	{
		var row = document.getElementById(idx);
		row.classList.toggle("kitchenItemStrike");
		document.getElementById(idx+"btn").style.display = "none";
	}
	
	$scope.orderComplete = function(order)
	{
		order.kitchenComplete = true;
		OrderService.updateOrder(order).then(function(orderDone){
			alert("Order updated");
		}, function(){

            alert( "Order not updated" );
        });
	}
	
	SocketService.on('order.added', function( order ){
			OrderService.getOrder(order._id).then(function(newOrder){
				$scope.$applyAsync( function(){
					$scope.allOrders.push( newOrder ); 
                });
			})
        });
   
    $scope.$on( '$destroy', function( event ){
      SocketService.getSocket().removeAllListeners();
    });
	
	$scope.waitTime = function(placed)
	{
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
	
	$interval($scope.waitTime,1000);
});