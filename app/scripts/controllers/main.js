'use strict';

/**
 * @ngdoc function
 * @name ciao4jApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ciao4jApp
 */
angular.module('ciao4jApp').controller('MainCtrl', function ($scope) {    
    $scope.page = 0;
    $scope.$watch('page', function () {
        document.querySelector('core-animated-pages').selected = $scope.page;
    });
});