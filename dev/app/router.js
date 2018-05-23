angular.module('DGSApp').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    'use strict';

    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'app/views/login.view.html',
        controller: 'LoginController',
         data : {requireLogin : true },
    })  
    .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/views/dashboard.view.html',
        controller: 'DashboardController',
         data : {requireLogin : true },
    })
    .state('payment', {
        url: '/payment',
        templateUrl: 'app/views/payment.view.html',
        controller: 'PaymentController',
         data : {requireLogin : true },
    })


    $urlRouterProvider.otherwise('/login');

}]);
