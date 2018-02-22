angular.module('myApp').controller('counterController', [ '$routeParams', '$location', '$route', '$scope', 'ItemService', 'OrderService', function( $routeParams, $location, $route, $scope, ItemService, OrderService ){

	$scope.title = "Counter"
    $scope.tableOrders = [];
	
  OrderService.getOrders().then ( function( allOrders ){
	$scope.allOrders = allOrders  
	$scope.tableOrdersShow = true;
  })
  
	$scope.selectTable = function( tableNumber ) {
		for(var i=0;i<$scope.allOrders.length;i++)
		{
			if($scope.allOrders[i].tableNumber == tableNumber)
			{
				$scope.tableOrders.push($scope.allOrders[i]);
				console.log($scope.tableOrders);
			}
		}
		
	}
	$scope.totalPrice = function(){
		var total=0;
		for (count=0;count<$scope.tableOrders.length;count++){
		total += $scope.item[count].price +$scope.item[count].price;
		}
		return total;
	}
$scope
}]);