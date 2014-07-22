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
            debugger;
            if (typeof user == 'undefined' || !user) return;
            debugger;
            $cookies['user_id'] = user._id;
            debugger;
            $rootScope.user = user;
            debugger;
            if (user.pet) $cookies['user_pet_id'] = user.pet;
            debugger;
            var returnUrl = localStorage.getItem("returnUrl");
            debugger;
            $timeout(function () {
                debugger;
                if (returnUrl) {
                    debugger;
                    $location.path(returnUrl);
                    debugger;
                    localStorage.setItem("returnUrl", '');
                    debugger;
                } else {
                    debugger;
                    $location.path('/');
                    debugger;
                }
                debugger;
            }, 500);
            debugger;
        }

        window.debug = $scope;
    }]);
