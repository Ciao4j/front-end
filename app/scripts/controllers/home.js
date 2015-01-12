'use strict';

/**
 * @ngdoc function
 * @name ciao4jApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the ciao4jApp
 */
angular.module('ciao4jApp').controller('HomeCtrl', function ($rootScope, $scope, $state, Restangular) {
    $scope.mock = Restangular.one('mock');
    $scope.ciao4j = Restangular.one('ciao4j');

    function updateToolbarHeight() {
        //        $('core-scroll-header-panel').prop('headerHeight', $('core-toolbar').width() / 3);
        $scope.toolbarHeight = $('<style>.tall {height: ' + $('core-toolbar').width() / 3 + 'px;}</style>');
        $(document.head).append($scope.toolbarHeight);
    }
    $(window).resize(function () {
        $scope.toolbarHeight.remove();
        updateToolbarHeight();
    });
    updateToolbarHeight();

    // custom transformation: scale header's title
    var titleStyle = document.querySelector('.title-home').style;
    addEventListener('core-header-transform', function (e) {
        var d = e.detail;
        var m = d.height - d.condensedHeight;
        var scale = Math.max(0.75, (m - d.y) / (m / 0.25) + 0.75);
        titleStyle.transform = titleStyle.webkitTransform =
            'scale(' + scale + ') translateZ(0)';
    });

    $('paper-shadow').mouseover(function () {
        this.setZ(3);
    }).mouseout(function () {
        this.setZ(1);
    });

    $scope.techs = ['Neo4j', 'AngularJS', 'AngularUI', 'jQuery', 'Polymer', 'Yeoman'];

    $scope.$signInDialogButton = $('.sign-in-dialog-button');
    $scope.$signUpDialogButton = $('.sign-up-dialog-button');
    $scope.signInDialog = document.querySelector('.sign-in-dialog');
    $scope.signUpDialog = document.querySelector('.sign-up-dialog');
    $scope.toggleSignInDialog = function () {
        $scope.tryUsername = '';
        $scope.pwd = '';
        $scope.signInDialog.toggle();
    };
    $scope.toggleSignUpDialog = function () {
        $scope.tryUsername = '';
        $scope.pwd = '';
        $scope.rePwd = '';
        $scope.nickname = '';
        $('.sign-up-dialog paper-radio-group').prop('selected', 'male');
        $scope.birthday = '';
        $scope.signUpDialog.toggle();
    };
    $('paper-button').mouseover(function () {
        this.raised = true;
    }).mouseout(function () {
        this.raised = false;
    });
    $scope.signInUsername = document.querySelector('#sign-in-username');
    $scope.signInPwd = document.querySelector('#sign-in-pwd');
    $scope.signInUsernameInput = $scope.signInUsername.querySelector('input');
    $scope.signInPwdInput = $scope.signInPwd.querySelector('input');
    $scope.signIn = function () {
        if (($scope.signInUsername.isInvalid = !$scope.signInUsernameInput.validity.valid) || ($scope.signInPwd.isInvalid = !$scope.signInPwdInput.validity.valid)) {
            return;
        }
        //        $scope.mock.customGET('CheckAccount', {
        $scope.ciao4j.customGET('login', {
            username: $scope.tryUsername,
            pwd: $scope.pwd
        }).then(function (data) {
            if (data.success) {
                $rootScope.username = $scope.tryUsername;
                $scope.signInDialog.toggle();
                $state.go('main');
            } else {
                alert('error');
            }
        });
    };
    $($scope.signInUsername).focus(function () {
        $scope.signInUsername.isInvalid = false;
    });
    $($scope.signInPwd).focus(function () {
        $scope.signInPwd.isInvalid = false;
    });
    $scope.signUpUsername = document.querySelector('#sign-up-username');
    $scope.signUpPwd = document.querySelector('#sign-up-pwd');
    $scope.signUpRePwd = document.querySelector('#sign-up-re-pwd');
    $scope.signUpNickname = document.querySelector('#sign-up-nickname');
    $scope.signUpUsernameInput = $scope.signUpUsername.querySelector('input');
    $scope.signUpPwdInput = $scope.signUpPwd.querySelector('input');
    $scope.signUpRePwdInput = $scope.signUpRePwd.querySelector('input');
    $scope.signUpNicknameInput = $scope.signUpNickname.querySelector('input');
    $scope.$gender = $('.sign-up-dialog paper-radio-group');
    $scope.signUp = function () {
        if (($scope.signUpUsername.isInvalid = !$scope.signUpUsernameInput.validity.valid) || ($scope.signUpPwd.isInvalid = !$scope.signUpPwdInput.validity.valid) || ($scope.signUpRePwd.isInvalid = ($scope.rePwd != $scope.pwd)) || ($scope.signUpNickname.isInvalid = !$scope.signUpNicknameInput.validity.valid)) {
            return;
        }
        //        $scope.mock.customGET('registration', {
        $scope.ciao4j.customGET('register', {
            username: $scope.tryUsername,
            pwd: $scope.pwd,
            nickname: $scope.nickname,
            sex: $scope.$gender.prop('selected'),
            birthday: $scope.birthday
        }).then(function (data) {
            if (data.success) {
                $rootScope.username = $scope.tryUsername;
                $scope.signUpDialog.toggle();
                $state.go('main');
            } else {
                alert('error');
            }
        });
    };
    $($scope.signInUsername).focus(function () {
        $scope.signInUsername.isInvalid = false;
    });
    $($scope.signInPwd).focus(function () {
        $scope.signInPwd.isInvalid = false;
    });
});