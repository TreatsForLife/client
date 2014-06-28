'use strict';

angular.module('clientApp')
  .controller('WelcomeCtrl', function ($scope, $rootScope, $location) {
        $rootScope.bodyClass='welcome';
        $scope.fbLogin = function(){
            if (!FB) return;
//            localStorage.setItem('fb', true);
//            console.log(localStorage);
//            $location.path('/');
            FB.login(function(response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me', function(response) {
                        localStorage.setItem('fb', response);
                        console.log('Good to see you, ' + response.name + '.');
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });

        }
  });
