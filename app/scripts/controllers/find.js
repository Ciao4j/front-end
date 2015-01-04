'use strict';

/**
 * @ngdoc function
 * @name ciao4jApp.controller:FindCtrl
 * @description
 * # FindCtrl
 * Controller of the ciao4jApp
 */
angular.module('ciao4jApp').controller('FindCtrl', function ($scope, $state, Restangular) {
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
        $scope.mock.getList('FindFriends', {
            username: $scope.username
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

    $scope.back = function () {
        $state.go('main');
    };

    var searchForm = document.querySelector('.search');
    $scope.searchUsername = searchForm.querySelector('.search-username');
    $scope.nickname = searchForm.querySelector('.search-nickname');
    $scope.sex = searchForm.querySelector('.search-sex');
    $scope.birthday = searchForm.querySelector('.search-birthday');
    $scope.search = function () {
        $scope.mock.getList('FindFriends', {
            username: $scope.username,
            searchUsername: $scope.searchUsername.value,
            nickname: $scope.nickname.value,
            sex: $scope.sex.selected,
            birthday: $scope.birthday.value
        }).then(function (friends) {
            $scope.friends = friends;
            $('.find-list').css({
                'overflow': 'visible'
            });
        })
    };
    //    $scope.ciaoInput = document.querySelector('.ciao-input');
    //    $scope.ciaoTextarea = $scope.ciaoInput.querySelector('.ciao-textarea');
    //    $scope.say = function () {
    //        if ($scope.ciaoInput.isInvalid = !$scope.ciaoTextarea.validity.valid) {
    //            return;
    //        }
    //        $scope.mock.customGET('PublishMessage', {
    //            username: $scope.username,
    //            message: $scope.ciaoTextarea.value
    //        }).then(function (data) {
    //            if (data.success) {
    //                $scope.ciaoTextarea.value = "";
    //                $scope.refreshMine();
    //            }
    //        });
    //    };
    //    $($scope.ciaoTextarea).focus(function () {
    //        $scope.ciaoInput.isInvalid = false;
    //    });
    //
    //    $scope.page = 0;
    //    $scope.init = [false, false, false];
    //    $scope.$watch('page', function () {
    //        if (!$scope.init[$scope.page]) {
    //            $scope.refresh();
    //            $scope.init[$scope.page] = true;
    //        }
    //        document.querySelector('core-animated-pages').selected = $scope.page;
    //    });
});