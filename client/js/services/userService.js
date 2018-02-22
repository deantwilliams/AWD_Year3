angular.module('myApp').factory('UserService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {

	return ({
		login: login,
		createAdminAccount: createAdminAccount,
		deleteAdminAccount: deleteAdminAccount
	})

	function login(user) {
		return $http({ method: 'POST', url: 'api/admin/login', data: user });
	}

	function createAdminAccount() {
		return $http({ method: 'POST', url: 'api/admin/createadmin' });
	}

	function deleteAdminAccount(){
		return $http({ method: 'DELETE', url: 'api/admin/deleteadmin'});
	}

}]);