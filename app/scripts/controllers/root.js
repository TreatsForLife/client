'use strict';

angular.module('clientApp')
    .controller('RootCtrl', ['$scope', '$rootScope', '$timeout', '$cookies', '$location', 'Donations', 'Users', function ($scope, $rootScope, $timeout, $cookies, $location, Donations, Users) {

        console.log('APP VERSION: 1.0');

        $scope.isWeb = angular.element(window).width() > 700;

        console.log('Getting data from cookies', $cookies);
        $rootScope.fb_id = $cookies.fb_id;
        $rootScope.user_id = $cookies['user_id'];
        $rootScope.user_pet_id = $cookies.user_pet_id;

        //make sure that the user is fetched
        if (!$rootScope.user && $rootScope.user_id) {
            console.log('No user but user_id cookie is found - fetching from DB');
            $timeout(function () {
                Users.query({id: $rootScope.user_id}, function (user) {
                    if (user._id) {
                        console.log('Found user in DB', user);
                        $rootScope.user = user;
                        $scope.$broadcast('userIsFetched');
                        //make sure that user_id cookie is saved
                        if (!$cookies.user_id && $rootScope.user && $rootScope.user._id) {
                            $cookies.user_id = $rootScope.user._id;
                            console.log('Saving user_id cookie', $rootScope.user._id, $cookies.user_id);
                        }
                        //make sure that user_pet_id cookie is saved
                        if (!$cookies.user_pet_id && $rootScope.user && $rootScope.user.pet && $rootScope.user.pet._id) {
                            $cookies.user_pet_id = $rootScope.user.pet._id;
                            console.log('Saving user_pet_id cookie', $rootScope.user.pet._id, $cookies.user_pet_id);
                        }
                    } else {
                        console.log('No user in DB - redirecting to welcome screen', $cookies);
                        localStorage.setItem("returnUrl", $location.path())
                        $location.path('/welcome');
                    }
                });
            })
        } else if (!$rootScope.user_id) {
            console.log('No user_id cookies found - redirecting to welcome screen', $cookies);
            localStorage.setItem("returnUrl", $location.path())
            $location.path('/welcome');
        }

        $rootScope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        }

        $rootScope.goBack = function () {
            $timeout(function () {
                $scope.goingBack = true;
            }, 0);
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
        $timeout(function () {
            window.scrollTo(0, 1);
        }, 1000);
    }]);
