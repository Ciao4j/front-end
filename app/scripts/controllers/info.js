'use strict';

/**
 * @ngdoc function
 * @name ciao4jApp.controller:InfoCtrl
 * @description
 * # InfoCtrl
 * Controller of the ciao4jApp
 */
angular.module('ciao4jApp').controller('InfoCtrl', function ($rootScope, $scope, $state, $stateParams, $timeout, Restangular) {
    $scope.username = $stateParams.username
    $scope.mock = Restangular.one('mock');
    $scope.ciao4j = Restangular.one('ciao4j');

    $scope.back = function () {
        window.history.go(-1);
    };

    $scope.friend = {
        gender: ''
    };
    $scope.ciao4j.customGET('getUserInfo', {
        username: $rootScope.username,
        searchUsername: $scope.username
    }).then(function (data) {
        $scope.friend = data;
    });

    $('.info').on('click', '.add', function () {
        var $this = $(this);
        //                $scope.mock.customGET('AddFriends', {
        $scope.ciao4j.customGET('addFriends', {
            username1: $rootScope.username,
            username2: $scope.username
        }).then(function (data) {
            if (data.success) {
                $scope.friend.isFriend = true;
            }
        });
    });

}).filter('capitalize', function () {
    return function (input, param) {
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    }
});