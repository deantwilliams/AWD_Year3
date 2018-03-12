angular.module("myApp").config(function ($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', { templateUrl: 'views/waiter.html', controller: 'waiterController' })

        .when('/admin', { templateUrl: 'views/admin.html', controller: 'adminController', access: { restricted: true } })
        .when('/kitchen', { templateUrl: 'views/kitchen.html', controller: 'kitchenController' })
        .when('/counter', { templateUrl: 'views/counter.html', controller: 'counterController' })
        .when('/waiter', { templateUrl: 'views/waiter.html', controller: 'waiterController' })
        .when('/login', { templateUrl: 'views/login.html', controller: 'loginController' })

        .when('/items/:id', { templateUrl: 'views/item.html', controller: 'itemController' })


        .otherwise({ templateUrl: 'views/404.html' });

    $locationProvider.html5Mode({ enabled: true, rewriteLinks: false });
});

angular.module("myApp").run( function( $rootScope, $location, $route, UserService ){

    $rootScope.location = $location

    $rootScope.$on( '$routeChangeStart', function( event, next, current ){

        UserService.getUserStatus( ).then( function( ){

            if( next.access ){
                if( next.access.restricted && !UserService.isLoggedIn() ){

                  $location.path( '/login' );
                  $route.reload();

                }
            }
            
        }).catch( function( err ){
            console.log( "error = " + err );
        });
    });
});
