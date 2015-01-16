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
    'ng-polymer-elements',
    'restangular',
    'angular-loading-bar'
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
        controller: 'HomeCtrl'
        //        templateUrl: 'views/test.html',
        //        controller: 'TestCtrl'
    }).state('main', {
        url: '/main',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    }).state('find', {
        url: '/find',
        templateUrl: 'views/find.html',
        controller: 'FindCtrl'
    }).state('info', {
        url: '/info/:username',
        templateUrl: 'views/info.html',
        controller: 'InfoCtrl'
    });

    cfpLoadingBarProvider.includeSpinner = false;
});