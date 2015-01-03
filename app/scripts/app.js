'use strict';

/**
 * @ngdoc overview
 * @name ciao4jApp
 * @description
 * # ciao4jApp
 *
 * Main module of the application.
 */
angular.module('ciao4jApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
     //    'ngMaterial',
    'ui.router',
    'angular-loading-bar',
    'restangular',
    'ng-polymer-elements'
])
//    .config(function ($routeProvider) {
//        $routeProvider
//            .when('/', {
//                templateUrl: 'views/main.html',
//                controller: 'MainCtrl'
//            })
//            .when('/about', {
//                templateUrl: 'views/about.html',
//                controller: 'AboutCtrl'
//            })
//            .otherwise({
//                redirectTo: '/'
//            });
//    })
.config(function ($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        //        templateUrl: 'views/test.html',
        controller: 'HomeCtrl'
    }).state('main', {
        url: '/main',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })

    cfpLoadingBarProvider.includeSpinner = false;
})