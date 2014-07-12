'use strict';

angular.module('clientApp')
    .controller('RootCtrl', ['$scope', '$rootScope', '$timeout', '$cookies', '$location', 'Donations', function ($scope, $rootScope, $timeout, $cookies, $location, Donations) {

        $rootScope.picHeight = $(window).width() * 0.6;

        $rootScope.fb_id = $cookies.fb_id;
        $rootScope.user_id = $cookies.user_id;
        $rootScope.user_pet_id = $cookies.user_pet_id;

        var q = $location.search();
        if (q['item_number']){
            Donations.approve({item_number: q['item_number']});
        }

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
