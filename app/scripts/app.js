'use strict';

angular.module('clientApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/boy', {
        templateUrl: 'views/pet.html',
        controller: 'PetsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
