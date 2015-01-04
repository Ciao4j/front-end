'use strict';

/**
 * @ngdoc function
 * @name ciao4jApp.controller:FindCtrl
 * @description
 * # FindCtrl
 * Controller of the ciao4jApp
 */
angular.module('ciao4jApp').controller('FindCtrl', function ($scope, $state, $timeout, Restangular) {
    $scope.username = 'nexzhu';
    $scope.mock = Restangular.one('mock');

    $scope.back = function () {
        $state.go('main');
    };

    $('paper-button').mouseover(function () {
        this.raised = true;
    }).mouseout(function () {
        this.raised = false;
    });
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
            $('.find-list').css({
                'overflow': 'visible'
            });
            $scope.friends = friends;
            var timer = $timeout(function () {}, 100);
            timer.then(function () {
                //                $('.add').click(function () {
                $('.find-list').on('click', '.add', function () {
                    var $this = $(this);
                    $scope.mock.customGET('AddFriends', {
                        username1: $scope.username,
                        username2: $this.attr('username')
                    }).then(function (data) {
                        if (data.success) {
                            $scope.friends[$this.attr('index')].isFriend = true;
                        }
                    });
                });
                $timeout.cancel(timer);
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