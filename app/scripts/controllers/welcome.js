'use strict';

angular.module('clientApp')
    .controller('WelcomeCtrl', ['$scope', '$rootScope', '$cookieStore', '$timeout', '$location', 'Users', function ($scope, $rootScope, $cookieStore, $timeout, $location, Users) {
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
            if (!FB) return;
//            localStorage.setItem('fb', true);
//            console.log(localStorage);
//            $location.path('/');
            FB.login(function (response) {
                if (response.authResponse) {
//                    console.log('Welcome!  Fetching your information.... ');
                    $cookieStore.put('fb_at', response.authResponse.accessToken.replace(/\"/g,''));
                    $cookieStore.put('fb_id', response.authResponse.userID.replace(/\"/g,''));
                    FB.api('/me', function (response) {
                        Users.create({name: response.name, email: response.email, image: 'https://graph.facebook.com/'+response.username+'/picture'}, function(user){
                            $cookieStore.put('user_id', user._id.replace(/\"/g,''));
                            if (user.pet) $cookieStore.put('user_pet_id', user.pet.replace(/\"/g,''));
                        });
                        $location.path('/');
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });
        }

        window.debug = $scope;
    }]);
