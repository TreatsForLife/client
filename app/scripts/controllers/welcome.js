'use strict';

angular.module('clientApp')
  .controller('WelcomeCtrl', function ($scope, $rootScope, $location) {
        $rootScope.bodyClass='welcome';
        $scope.fbLogin = function(){
            localStorage.setItem('fb', true);
            console.log(localStorage);
            $location.path('/');
        }
  });
