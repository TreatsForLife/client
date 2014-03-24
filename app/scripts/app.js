'use strict';

angular.module('clientApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ])
    .config(function ($routeProvider, $compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|http?|ftp|mailto|file|tel):/);
        $routeProvider
            .when('/welcome', {
                templateUrl: 'views/welcome.html',
                controller: 'WelcomeCtrl'
            })
            .when('/pet', {
                templateUrl: 'views/pet.html',
                controller: 'PetCtrl'
            })
            .when('/pets', {
                templateUrl: 'views/pets.html',
                controller: 'PetsCtrl'
            })
            .when('/', {
                templateUrl: 'views/pets.html',
                controller: 'PetsCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function ($location) {

        console.log(localStorage);
        if (!localStorage.getItem('fb')) {
            $location.path('/welcome');
        } else if (!localStorage.getItem('pet')) {
            $location.path('/pets');
        } else {
            $location.path('/pet');
        }
    });
