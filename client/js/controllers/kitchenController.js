var app = angular.module('myApp');

app.controller('kitchenController', function( $scope, $interval, ItemService, OrderService, SocketService){

	$scope.title = "Kitchen";
	$scope.allOrders = [];
	$scope.allItems = [];
	$scope.noOfOrders = 0;

	OrderService.getOrders().then(function (allOrders){
		if(allOrders == null || allOrders.length == 0)
		{
			$scope.noOfOrders = 0
		}
		else
		{
			$scope.orderStatus(allOrders);
			$scope.allItemsFill(allOrders);
			$scope.allOrders = allOrders;
		}
	})
	
	$scope.strikeItemFromOrder = function(idx,qty)
	{
		var row = document.getElementById(idx);
		row.classList.toggle("kitchenItemStrike");
		document.getElementById(idx+"btn").style.display = "none";
		var itemID = idx.split("/")[1];
		var orderID = idx.split("/")[0];
		var idxOrder = $scope.allOrders.map(function(x) {return x._id; }).indexOf(orderID);
		for(var i=0;i<$scope.allOrders[idxOrder].items.length;i++)
		{
			if($scope.allOrders[idxOrder].items[i].item.id == itemID)
			{
				$scope.allOrders[idxOrder].items[i].quantity = 0;
			}
		}
		
		$scope.removeQuantity(itemID,qty);
	}
	
	$scope.orderComplete = function(order)
	{
		order.kitchenComplete = true;
		var idx = $scope.allOrders.map(function(x) {return x._id; }).indexOf(order._id);
		$scope.allOrders.splice(idx,1);
		$scope.removeFromAllItems(order);
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
					$scope.allItemsFill($scope.allOrders);
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
		for(var i=0;i<allOrders.length;i++)
		{
			if(allOrders[i].kitchenComplete == false)
			{
				$scope.noOfOrders+=1;
			}
		}
	};
	
	$scope.allItemsFill = function(allOrders)
	{
		$scope.allItems = [];
		for(var i=0;i<allOrders.length;i++)
		{
			for(var j=0;j<allOrders[i].items.length;j++)
			{
				if(!allOrders[i].kitchenComplete)
				{
					var orderItem = allOrders[i].items[j].item;
					var orderItemQty = allOrders[i].items[j].quantity;
					if(!$scope.allItems.find(x => x.id === orderItem.id))
					{
						orderItem.quantity = orderItemQty;
						$scope.allItems.push(orderItem);
					}
					else
					{
						var idx = $scope.allItems.map(function(x) {return x.id; }).indexOf(allOrders[i].items[j].item.id);
						$scope.allItems[idx].quantity += orderItemQty;
					}
				}
			}
		}
	}
	
	$scope.removeFromAllItems = function(order)
	{
		for(var i=0;i<order.items.length;i++)
		{
			var orderItemQty = order.items[i].quantity;
			var idx = $scope.allItems.map(function(x) {return x.id; }).indexOf(order.items[i].item.id);
			$scope.allItems[idx].quantity -= orderItemQty;
		}
	}
	
	$scope.removeQuantity = function(id,qty)
	{
		var idx = $scope.allItems.map(function(x) {return x.id; }).indexOf(parseInt(id));
		$scope.allItems[idx].quantity -= qty;
	}
	
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