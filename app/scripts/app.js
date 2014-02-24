'use strict';

angular.module('clientApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/welcome', {
                templateUrl: 'views/welcome.html',
                controller: 'WelcomeCtrl'
            })
            .when('/', {
                templateUrl: 'views/pet.html',
                controller: 'PetsCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function ($location) {
        if (!localStorage.getItem('instagram_access_token')) {
            $location.path('/welcome');
        }
    });
