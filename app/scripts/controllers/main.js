'use strict';

/**
 * @ngdoc function
 * @name ciao4jApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ciao4jApp
 */
angular.module('ciao4jApp').controller('MainCtrl', function ($scope, $state, $timeout, Restangular) {
    $scope.username = 'nexzhu'
    $scope.mock = Restangular.one('mock');
    $scope.refreshCiaos = function () {
        $scope.mock.getList('ViewMessageFromFriends', {
            username: $scope.username
        }).then(function (ciaos) {
            $scope.ciaos = ciaos;
        });
    };
    $scope.refreshMine = function () {
        $scope.mock.getList('ViewMessageFromFriend', {
            username: $scope.username
        }).then(function (ciaos) {
            $scope.mine = ciaos;
        });
    };
    $scope.refreshFriends = function () {
        $scope.mock.getList('ListFriends', {
            username: $scope.username
        }).then(function (friends) {
            $scope.friends = friends;
            $('.friends-list').css({
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
    $(window).resize(function () {
        updateScaffoldMode();
    });
    updateScaffoldMode();

    $scope.toSay = function () {
        $scope.page = 1;
        var timer = $timeout(function () {}, 100);
        timer.then(function () {
            $($scope.ciaoTextarea).focus();
            $timeout.cancel(timer);
        });
    };
    $scope.find = function () {
        $state.go('find');
    }

    $scope.ciaoInput = document.querySelector('.ciao-input');
    $scope.ciaoTextarea = $scope.ciaoInput.querySelector('.ciao-textarea');
    $scope.say = function () {
        if ($scope.ciaoInput.isInvalid = !$scope.ciaoTextarea.validity.valid) {
            return;
        }
        $scope.mock.customGET('PublishMessage', {
            username: $scope.username,
            message: $scope.ciaoTextarea.value
        }).then(function (data) {
            if (data.success) {
                $scope.ciaoTextarea.value = "";
                $scope.refreshMine();
            }
        });
    };
    $($scope.ciaoTextarea).focus(function () {
        $scope.ciaoInput.isInvalid = false;
    });

    $scope.page = 0;
    $scope.init = [false, false, false];
    $scope.$watch('page', function () {
        if (!$scope.init[$scope.page]) {
            $scope.refresh();
            $scope.init[$scope.page] = true;
        }
        document.querySelector('core-animated-pages').selected = $scope.page;
    });
});