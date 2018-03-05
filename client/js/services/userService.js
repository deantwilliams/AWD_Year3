angular.module('myApp').factory('UserService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {

	var user = null;

	return ({
		login: login,
		logOut: logOut,
		createAdminAccount: createAdminAccount,
		deleteAdminAccount: deleteAdminAccount,
		isLoggedIn: isLoggedIn,
		getUserStatus: getUserStatus
	})

	function isLoggedIn( ){
        if( user ){
          return true;
        } else {
          return false;
        }
    }

    function getUserStatus() {
      return $http.get( '/api/admin/status' ).then(
        function successCallback( res ) {

            if( res.data.authenticated ){
              user = true;
            } else {
              user = false;
            }
        }, function errorCallback( res ){
            user = false;
        }
      );
    }

	function login( user ){


		// return $http({ method: 'POST', url: 'api/admin/login', data: user });

		var deferred = $q.defer();

        $http.post('/api/admin/login', user ).then( 
            function successCallback( res ){
                user = true;
                deferred.resolve();
        }, function errorCallback( res ){
                user = false;
                deferred.reject();
        });

        return deferred.promise;
	}

	function createAdminAccount() {
		return $http({ method: 'POST', url: 'api/admin/createadmin' });
	}

	function deleteAdminAccount(){
		return $http({ method: 'DELETE', url: 'api/admin/deleteadmin'});
	}
	
	function logOut(){
		return $http({ method: 'GET', url: 'api/admin/signout'});
	}
}]);