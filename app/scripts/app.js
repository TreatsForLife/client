'use strict';

angular.module('clientApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ngRoute',
        'ngAnimate',
        'timer'
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
            .when('/pet/:id', {
                templateUrl: 'views/pet.html',
                controller: 'PetCtrl'
            })
            .when('/shop/:id', {
                templateUrl: 'views/shop.html',
                controller: 'ShopCtrl'
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
    .run(function ($location, $cookies) {

        if ($location.path() == '/') {
            console.log('$cookies', $cookies.fb_user);
            if (!$cookies.fb_id || $location.search()['s'] == 'w') {
                $location.path('/welcome');
            } else if (!$cookies.pet) {
                $location.path('/pets');
            } else {
                $location.path('/pet');
            }
        }
    });
