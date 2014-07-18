'use strict';

angular.module('clientApp')
    .controller('RootCtrl', ['$scope', '$rootScope', '$timeout', '$cookies', '$location', 'Donations', 'Users', function ($scope, $rootScope, $timeout, $cookies, $location, Donations, Users) {

        $rootScope.fb_id = $cookies.fb_id;
        $rootScope.user_id = $cookies.user_id;
        $rootScope.user_pet_id = $cookies.user_pet_id;

        //make sure that the user is fetched
        if (!$rootScope.user && $rootScope.user_id) {
            $rootScope.user = Users.get({id: $rootScope.user_id}, function (user) {
            });
        }else if (!$rootScope.user_id){
            $location.path('/welcome');
        }

        var q = $location.search();
        if (q['item_number']) {
            Donations.approve({item_number: q['item_number']});
            $location.search({});
        }

        $rootScope.goBack = function () {
            $scope.goingBack = true;
            $timeout(function () {
                $scope.goingBack = false;
            }, 1000);
            window.history.back();
        }

        $rootScope.openPushMenu = function () {
            angular.element('body').addClass('pushed');
            angular.element('#menuRight').addClass('cbp-spmenu-open');
        };
        $rootScope.closePushMenu = function () {
            angular.element('body').removeClass('pushed');
            angular.element('#menuRight').removeClass('cbp-spmenu-open');
        };

        $timeout(function () {
            $scope.canAnimate = true;
            $rootScope.windowHeight = $(window).height();
            $rootScope.containerWidth = $('.container').width();
            $rootScope.picHeight = $('.container').width() * 0.6;
        }, 5)
    }]);
