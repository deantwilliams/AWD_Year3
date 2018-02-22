var app = angular.module('myApp');

app.controller('loginController', ['$routeParams', '$location', '$route', '$scope', '$location', '$interval', 'ItemService', 'OrderService', 'SocketService', 'UserService', function ($routeParams, $location, $route, $scope, $location, $interval, ItemService, OrderService, SocketService, UserService) {

	$scope.login = function (user) {
		
		UserService.login(user).then( function( ){

          $location.path('/admin');
        
        }).catch(function () {
		  $scope.errorMessage = "Invalid email and/or password";
		  
        });
	}

	$scope.createAdminAccount = function(){
		console.log("creating admin account");
		UserService.createAdminAccount();
	}
	
	$scope.deleteAdminAccount = function(){
		console.log("deleting admin account");
		UserService.deleteAdminAccount();
	}

}]);
