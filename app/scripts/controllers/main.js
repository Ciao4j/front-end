'use strict';

/**
 * @ngdoc function
 * @name ciao4jApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ciao4jApp
 */
angular.module('ciao4jApp').controller('MainCtrl', function ($scope, Restangular) {
    $scope.mock = Restangular.one('mock');
    $scope.refreshCiaos = function () {
        $scope.mock.getList('ViewMessageFromFriends', {
            username: 'username'
        }).then(function (ciaos) {
            $scope.ciaos = ciaos;
        });
    };
    $scope.refreshMine = function () {
        $scope.mock.getList('ViewMessageFromFriend', {
            username: 'username'
        }).then(function (ciaos) {
            $scope.mine = ciaos;
        });
    };
    $scope.refreshFriends = function () {
        $scope.mock.getList('FindFriends', {
            username: 'username'
        }).then(function (friends) {
            $scope.friends = friends;
            $('core-list').css({
                'overflow': 'visible'
            });
        });
    };
    $scope.refresh = function () {
        switch ($scope.page) {
        case 0:
            $scope.refreshCiaos();
            break;
        case 1:
            $scope.refreshMine();
            break;
        case 2:
            $scope.refreshFriends();
            break;
        }
        $('section.core-selected').scrollTop(0);
    };

    function updateScaffoldMode() {
        var width = document.documentElement.clientWidth;
        var scaffold = document.querySelector('core-scaffold');
        if (width > 960) {
            scaffold.mode = 'cover';
        } else {
            scaffold.mode = 'standard';
        }
    }

    $scope.page = 0;
    $scope.init = [false, false, false];
    $scope.$watch('page', function () {
        if (!$scope.init[$scope.page]) {
            $scope.refresh();
            $scope.init[$scope.page] = true;
        }
        document.querySelector('core-animated-pages').selected = $scope.page;
    });

    $(window).resize(function () {
        updateScaffoldMode();
    });

    updateScaffoldMode();
});