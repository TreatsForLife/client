'use strict';

angular.module('clientApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ngRoute',
        'ngAnimate',
    ])
    .config(function ($routeProvider, $compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|http?|ftp|mailto|file|tel):/);
        $routeProvider
            .when('/pet', {
                templateUrl: 'views/pet.html',
                controller: 'PetCtrl',
                reloadOnSearch: false
            })
            .when('/pet/:pet_id', {
                templateUrl: 'views/pet.html',
                controller: 'PetCtrl',
                reloadOnSearch: false
            })
          .when('/shop/:user_id/:pet_id', {
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
            .when('/payed/:pet_id', {
              templateUrl: 'views/payed.html',
              controller: 'PayedCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function ($location, $cookies) {

    });
