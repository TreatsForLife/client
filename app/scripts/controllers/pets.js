'use strict';

angular.module('clientApp')
    .controller('PetsCtrl', function ($scope, $rootScope, $timeout, Pets, Instagram) {
        $rootScope.bodyClass = 'pets';
        $rootScope.navbarTitle = 'כלבים בודדים';

        $scope.pets = Pets.all();

        window.debug = $scope;
    });
