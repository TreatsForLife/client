'use strict';

angular.module('clientApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/welcome.html',
            controller: 'WelcomeCtrl'
        })
        .when('/boy', {
            templateUrl: 'views/pet.html',
            controller: 'PetsCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
  });
