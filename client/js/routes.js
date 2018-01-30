var myApp = angular.module("myApp", ['ngRoute']);

myApp.config( function( $routeProvider, $locationProvider ){
    $routeProvider

        .when('/', { templateUrl: 'views/home.html' })

        .when('/admin', { templateUrl: 'views/admin.html', controller: 'adminController', controllerAs: 'ctrl' })
        .when('/kitchen', { templateUrl: 'views/kitchen.html', controller: 'kitchenController', controllerAs: 'ctrl' })
        .when('/counter', { templateUrl: 'views/counter.html', controller: 'counterController', controllerAs: 'ctrl' })
        .when('/server', { templateUrl: 'views/server.html', controller: 'serverController', controllerAs: 'ctrl' })

        // viewing individual items and orders
        .when('/orders/:id', { templateUrl: 'views/order.html', controller: 'counterController', controllerAs: 'ctrl' })
        .when('/items/:id', { templateUrl: 'views/item.html', controller: 'adminController', controllerAs: 'ctrl' })


        .otherwise({ templateUrl: 'views/404.html' });

    $locationProvider.html5Mode({ enabled: true, rewriteLinks: false });
});