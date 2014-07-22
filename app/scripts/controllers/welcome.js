'use strict';

angular.module('clientApp')
    .controller('WelcomeCtrl', ['$scope', '$rootScope', '$cookies', '$timeout', '$location', 'Users', function ($scope, $rootScope, $cookies, $timeout, $location, Users) {
        $rootScope.bodyClass = 'welcome';

        $scope.placeLogo = function () {
            $timeout(function () {
                $scope.logoSpace = $('.welcome-app-explained').offset().top;
                $scope.logoHeight = (($scope.logoSpace - 196) / 2);
                $scope.logoMargin = (($scope.logoSpace - 196) / 2) + 'px auto';
                $scope.logoMargin = (($scope.logoSpace - 196) / 2) + 'px auto';
            });
        }

        $scope.fbLogin = function () {
            if (typeof(FB) == 'undefined' || !FB) return;
//            localStorage.setItem('fb', true);
//            console.log(localStorage);
//            $location.path('/');
            FB.login(function (response) {
                if (response.authResponse) {
//                    console.log('Welcome!  Fetching your information.... ');
//                    $cookies['fb_at'] = response.authResponse.accessToken;
                    $cookies['fb_id'] = response.authResponse.userID;
                    FB.api('/me', function (response) {
                        Users.create({name: response.name, email: response.email, image: 'https://graph.facebook.com/' + response.username + '/picture'}, function (user) {
                            storeUserAndRedirect(user);
                        });
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });
        }

        $timeout(function () {
            if (typeof(FB) == 'undefined' || !FB) return;
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    // the user is logged in and has authenticated your
                    // app, and response.authResponse supplies
                    // the user's ID, a valid access token, a signed
                    // request, and the time the access token
                    // and signed request each expire
                    $cookies['fb_id'] = response.authResponse.userID;
                    var user = $rootScope.user;
                    if (user) {
                        storeUserAndRedirect(user)
                    } else {
                        Users.all({fb_id: response.authResponse.userID}, function (users) {
                            user = users[0];
                            storeUserAndRedirect(user);
                        });
                    }
                } else if (response.status === 'not_authorized') {
                    // the user is logged in to Facebook,
                    // but has not authenticated your app
                } else {
                    // the user isn't logged in to Facebook.
                }
            });

        }, 500);

        function storeUserAndRedirect(user) {
            if (typeof user == 'undefined' || !user) return;
            $cookies['user_id'] = user._id;
            $rootScope.user = user;
            if (user.pet) $cookies['user_pet_id'] = user.pet ? user.pet._id : '';
            var returnUrl = localStorage.getItem("returnUrl");
            $timeout(function () {
                if (returnUrl) {
                    $location.path(returnUrl);
                    localStorage.setItem("returnUrl", '');
                } else {
                    $location.path('/');
                }
            }, 500);
        }

        window.debug = $scope;
    }]);
