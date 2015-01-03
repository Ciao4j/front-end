'use strict';

/**
 * @ngdoc function
 * @name ciao4jApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the ciao4jApp
 */
angular.module('ciao4jApp').controller('HomeCtrl', function ($scope, $state, Restangular) {
    function updateToolbarHeight() {
        //        $('core-scroll-header-panel').prop('headerHeight', $('core-toolbar').width() / 3);
        $scope.toolbarHeight = $('<style>.tall {height: ' + $('core-toolbar').width() / 3 + 'px;}</style>');
        $(document.head).append($scope.toolbarHeight);
    }

    $(window).resize(function () {
        $scope.toolbarHeight.remove();
        updateToolbarHeight();
    });

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

    $scope.$signInDialogButton = $('.sign-in-dialog-button');
    $scope.$signUpDialogButton = $('.sign-up-dialog-button');
    $scope.signInDialog = document.querySelector('.sign-in-dialog');
    $scope.signUpDialog = document.querySelector('.sign-up-dialog');
    $scope.toggleSignInDialog = function () {
        $scope.signInDialog.toggle();
    };
    $scope.$signUpDialogButton.click(function () {
        $scope.signUpDialog.toggle();
    });
    $('paper-button').mouseover(function () {
        this.raised = "true";
    }).mouseout(function () {
        this.raised = false;
    });
    $scope.signIn = function () {
        $scope.signInDialog.toggle();
        $state.go('main');
    }

    updateToolbarHeight();
});