var app = angular.module('myApp');

app.controller('kitchenController', function( $scope, $interval, ItemService, OrderService, SocketService){

	$scope.title = "Kitchen";
	$scope.allOrders = [];
	$scope.noOfOrders = 0;

	OrderService.getOrders().then(function (allOrders){
		if(allOrders == null || allOrders.length == 0)
		{
			$scope.noOfOrders = 0
		}
		else
		{
			$scope.orderStatus(allOrders);
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
			$scope.orderStatus($scope.allOrders);
		}, function(){
            alert( "Order not updated" );
        });
	}
	
	SocketService.on('order.added', function( order ){
			OrderService.getOrder(order._id).then(function(newOrder){
				$scope.$applyAsync( function(){
					$scope.allOrders.push( newOrder );
					$scope.orderStatus($scope.allOrders);
                });
			})
        });
   
    $scope.$on( '$destroy', function( event ){
      SocketService.getSocket().removeAllListeners();
    });
	
	$scope.orderStatus = function(allOrders)
	{
		$scope.noOfOrders = 0;
		console.log(allOrders);
		for(var i=0;i<allOrders.length;i++)
		{
			if(allOrders[i].kitchenComplete == false)
			{
				$scope.noOfOrders+=1;
			}
		}
	};
	
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