var myApp = angular.module("myApp", ['ngRoute']);

myApp.config(function ($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', { templateUrl: 'views/home.html' })

        .when('/admin', { templateUrl: 'views/admin.html', controller: 'adminController', access: { restricted: true } })
        .when('/kitchen', { templateUrl: 'views/kitchen.html', controller: 'kitchenController' })
        .when('/counter', { templateUrl: 'views/counter.html', controller: 'counterController' })
        .when('/waiter', { templateUrl: 'views/waiter.html', controller: 'waiterController' })
        .when('/login', { templateUrl: 'views/login.html', controller: 'loginController' })

        // viewing individual items and orders
        .when('/orders/:id', { templateUrl: 'views/order.html', controller: 'counterController' })
        .when('/items/:id', { templateUrl: 'views/item.html', controller: 'adminController' })

        .otherwise({ templateUrl: 'views/404.html' });

    $locationProvider.html5Mode({ enabled: true, rewriteLinks: false });
});

myApp.run( function( $rootScope, $location, $route, UserService ){

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
