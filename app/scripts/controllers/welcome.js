'use strict';

angular.module('clientApp')
    .controller('WelcomeCtrl', function ($scope, $rootScope, $cookieStore, $timeout, $location, Users) {
        $rootScope.bodyClass = 'welcome';

        $scope.placeLogo = function () {
            $timeout(function () {
                $scope.logoSpace = $('.welcome-app-explained').offset().top;
                $scope.logoMargin = (($scope.logoSpace - 196) / 2) + 'px auto';
            });
        }

        $scope.fbLogin = function () {
            if (!FB) return;
//            localStorage.setItem('fb', true);
//            console.log(localStorage);
//            $location.path('/');
            FB.login(function (response) {
                if (response.authResponse) {
//                    console.log('Welcome!  Fetching your information.... ');
                    debugger;
                    $cookieStore.put('fb_at', response.authResponse.accessToken);
                    $cookieStore.put('fb_id', response.authResponse.userID);
                    FB.api('/me', function (response) {
                        debugger;
                        Users.create({name: response.name, email: response.email, image: 'https://graph.facebook.com/'+response.username+'/picture'});
                        $location.path('/');
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });
        }

        window.debug = $scope;
    });
