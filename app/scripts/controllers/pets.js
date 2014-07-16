'use strict';

angular.module('clientApp')
    .controller('PetsCtrl', function ($scope, $rootScope, $timeout, Pets, Instagram) {
        $rootScope.bodyClass = 'pets';
        $rootScope.navbarTitle = 'כלבים בודדים';

        $scope.picHeight = $('.container').width() * 0.6;
        $scope.pets = Pets.all();

        window.debug = $scope;
    });
