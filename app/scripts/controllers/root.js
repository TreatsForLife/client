'use strict';

angular.module('clientApp')
    .controller('RootCtrl', ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {

        $rootScope.picHeight = $(window).width() * 0.7;

        $rootScope.goBack = function () {
            $scope.goingBack = true;
            $timeout(function () {
                $scope.goingBack = false;
            }, 1000);
            window.history.back();
        }

        $timeout(function () {
            $scope.canAnimate = true;
        },500)
    }]);
