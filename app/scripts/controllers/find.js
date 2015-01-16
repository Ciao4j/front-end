'use strict';

/**
 * @ngdoc function
 * @name ciao4jApp.controller:FindCtrl
 * @description
 * # FindCtrl
 * Controller of the ciao4jApp
 */
angular.module('ciao4jApp').controller('FindCtrl', function ($rootScope, $scope, $state, $timeout, Restangular) {
    $scope.username = 'nexzhu';
    $scope.mock = Restangular.one('mock');
    $scope.ciao4j = Restangular.one('ciao4j');

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
    $scope.gender = searchForm.querySelector('.search-gender');
    $scope.birthday = searchForm.querySelector('.search-birthday');
    $scope.search = function () {
        //        $scope.mock.getList('FindFriends', {
        $scope.ciao4j.getList('findFriends', {
            username: $rootScope.username,
            searchUsername: $scope.searchUsername.value,
            nickname: $scope.nickname.value,
            gender: $scope.gender.selected,
            birthday: $scope.birthday.value
        }).then(function (friends) {
            $('.find-list').css({
                'overflow': 'visible'
            });
            $scope.friends = friends;
            $('.find-list').on('click', '.add', function () {
                var $this = $(this);
                //                $scope.mock.customGET('AddFriends', {
                $scope.ciao4j.customGET('addFriends', {
                    username1: $rootScope.username,
                    username2: $this.attr('username')
                }).then(function (data) {
                    if (data.success) {
                        $scope.friends[$this.attr('index')].isFriend = true;
                    }
                });
            });
        });
    };
});