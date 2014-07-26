'use strict';

angular.module('clientApp')
    .controller('WelcomeCtrl', ['$scope', '$rootScope', '$cookies', '$timeout', '$interval', '$location', 'Users', function ($scope, $rootScope, $cookies, $timeout, $interval, $location, Users) {
        $rootScope.bodyClass = 'welcome';

        $scope.placeLogo = function (iterations) {
            if (typeof iterations == 'undefined') iterations = 5;
            $timeout(function () {
                if (angular.element('.welcome-app-explained').length > 0) {
                    $rootScope.windowHeight = angular.element(window).height();
                    $rootScope.windowWidth = angular.element(window).width();

                    $scope.logoSpace = $rootScope.windowHeight - angular.element('.bottom-wrapper').height() - 40;
                    $scope.logoHeight = ($scope.logoSpace > 370) ? 370 : ($scope.logoSpace - 80);
                    $scope.logoMargin = parseInt(($scope.logoSpace - 370) / 2) + 'px auto';
                    $scope.logoWidth = $scope.logoHeight / 370 * 266;
                }
                if (iterations > 0) {
                    $timeout(function () {
                        $scope.placeLogo(iterations - 1);
                    }, 1000);
                }
            });
        }

        $scope.logoAnimationComplete = false;
        $scope.animateLogo = function () {
            var animationDuration = 1700;
            var numOfFrames = 48;
            var frame = numOfFrames;
            var dim = $scope.logoWidth
            var animationBgPosition = 0;
            var animationInterval = $interval(function () {
                debugger;
                if (frame == 0) {
                    $interval.cancel(animationInterval);
                    $timeout(function(){
                        $scope.logoAnimationComplete = true;
                    });
                    return;
                }
                angular.element('.welcome-logo-animation').css('background-position-x', -1 * animationBgPosition);
                frame--;
                animationBgPosition += dim;
            }, (animationDuration / numOfFrames))
        }
        $timeout(function(){
            $scope.animateLogo();
        }, 500);

        $scope.fbLogin = function () {
            if (typeof(FB) == 'undefined' || !FB) return;
//            localStorage.setItem('fb', true);
//            console.log(localStorage);
//            $location.path('/');
            FB.login(function (response) {
                console.log('FB login responded', response);
                if (response.authResponse) {
//                    console.log('Welcome!  Fetching your information.... ');
//                    $cookies['fb_at'] = response.authResponse.accessToken;
                    var fb_id = $cookies['fb_id'] = response.authResponse.userID;
                    console.log('saved fb_id cookie', $cookies['fb_id'], response.authResponse.userID);
                    FB.api('/me', function (response) {
                        console.log('fetched /me data from facebook - creating user', response);
                        Users.create({fb_id: fb_id, name: response.name, email: response.email, image: 'https://graph.facebook.com/' + response.username + '/picture'}, function (user) {
                            console.log('user created', user);
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
                console.log('Response arrived from facebook', response);
                if (response.status === 'connected') {
                    console.log('the user is logged in and has authenticated your app', response.authResponse);
                    var fb_id = $cookies['fb_id'] = response.authResponse.userID;
                    var user = $rootScope.user;
                    if (user) {
                        console.log('User found in scope', $rootScope.user);
                        storeUserAndRedirect(user)
                    } else {
                        console.log('User not found in scope - fetching from db - by fb_id', response.authResponse.userID);
                        Users.all({fb_id: response.authResponse.userID}, function (users) {
                            console.log('Users found in db', users);
                            user = users[0];
                            if (user){
                                console.log('User found in db', user);
                                storeUserAndRedirect(user);
                            }else{
                                FB.api('/me', function (response) {
                                    console.log('fetched /me data from facebook - creating user', response);
                                    Users.create({fb_id: fb_id, name: response.name, email: response.email, image: 'https://graph.facebook.com/' + response.username + '/picture'}, function (user) {
                                        console.log('user created', user);
                                        storeUserAndRedirect(user);
                                    });
                                });
                            }
                        });
                    }
                } else if (response.status === 'not_authorized') {
                    console.log('the user is logged in to Facebook, but has not authenticated your app');
                } else {
                    console.log('the user isnt logged in to Facebook');
                }
            });

        }, 500);

        function storeUserAndRedirect(user) {
            console.log('storeUserAndRedirect called', user);
            if (typeof user == 'undefined' || !user || !user._id) return;
            $cookies['user_id'] = user._id;
            console.log('saved user_id cookie', $cookies['user_id'], user._id);
            $rootScope.user = user;
            console.log('saved user to scope', $rootScope.user, user);
            if (user.pet) {
                $cookies['user_pet_id'] = user.pet ? user.pet._id : '';
                console.log('saved user_pet_id cookie', $cookies['user_pet_id'], user.pet._id);
            }
            var returnUrl = localStorage.getItem("returnUrl");
            console.log('got return url from local storage', returnUrl);
            $timeout(function () {
                if (returnUrl && returnUrl != '/welcome') {
                    localStorage.setItem("returnUrl", '');
                    console.log('Redirecting to return url', returnUrl);
                    $location.path(returnUrl);
                } else {
                    console.log('Redirecting to /');
                    $location.path('/');
                }
            }, 500);
        }

        window.debug = $scope;
    }]);
