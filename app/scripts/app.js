'use strict';

angular.module('clientApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ngRoute',
        'ngAnimate',
        'timer',
        'seo'
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
                controller: 'PetCtrl',
                reloadOnSearch: false
            })
            .when('/pet/:id', {
                templateUrl: 'views/pet.html',
                controller: 'PetCtrl',
                reloadOnSearch: false
            })
            .when('/shop/:id', {
                templateUrl: 'views/shop.html',
                controller: 'ShopCtrl',
                reloadOnSearch: false
            })
            .when('/pets', {
                templateUrl: 'views/pets.html',
                controller: 'PetsCtrl',
                reloadOnSearch: false
            })
            .when('/pets/:filter', {
                templateUrl: 'views/pets.html',
                controller: 'PetsCtrl',
                reloadOnSearch: false
            })
            .when('/', {
                templateUrl: 'views/pets.html',
                controller: 'PetsCtrl',
                reloadOnSearch: false
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function ($location, $cookies) {

        if (location.protocol == 'file:'){
            location.href = 'http://treatsforlife.org';
        }

        if ($location.path().length <= 1) {
            console.log('$cookies', $cookies);
            console.log('localStorage', localStorage);
            if (!localStorage.fb_id || $location.search()['s'] == 'w') {
                $location.path('/welcome');
            } else if (!localStorage.user_pet_id) {
                $location.path('/pets');
            } else {
                $location.path('/pet');
            }
        }
    });
