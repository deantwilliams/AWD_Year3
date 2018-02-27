angular.module('myApp').controller('counterController', [ '$scope', 'ItemService', 'OrderService', 'SocketService', function( $scope, ItemService, OrderService, SocketService ){

	$scope.title = "Counter"
    $scope.tableOrders = [];
	
  OrderService.getOrders().then ( function( allOrders ){
	$scope.allOrders = allOrders  
	$scope.tableOrdersShow = true;
  })
  
	$scope.selectTable = function( tableNumber ) {
		$scope.tableOrders = [];
		for(var i=0;i<$scope.allOrders.length;i++)
		{
			if($scope.allOrders[i].tableNumber == tableNumber)
			{
				$scope.tableOrders.push($scope.allOrders[i]);
			}
		}
		
	}
	
	$scope.totalPrice = function(order){
		var total=0;
		for (var count=0;count<order.items.length;count++){
		total += order.items[count].item.price * order.items[count].quantity;
		}
		return total;
	}
	
	
    $scope.payNow = function(order)
	{
		order.paid = true;
		OrderService.orderPaid(order).then(function(paymentDone){
			alert("Payment Completed");
		}, function(){
			alert ( "Payment not Completed");
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
		
		
}]);