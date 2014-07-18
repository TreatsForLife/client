'use strict';

angular.module('clientApp')
    .controller('PetsCtrl', ['$scope', '$rootScope', '$timeout', '$routeParams', 'Pets', function ($scope, $rootScope, $timeout, $routeParams, Pets) {
        $rootScope.bodyClass = 'pets';
        $scope.picHeight = $('.container').width() * 0.6;

        var filter = $routeParams['filter'];

        if (filter == 'owned') {
            $rootScope.navbarTitle = 'כלבים מאומצים';
            $scope.pets = Pets.owned();
        } else {
            $rootScope.navbarTitle = 'כלבים בודדים';
            $scope.pets = Pets.lonely();
        }

        $timeout(function () {
            if (!window.localStorage['pets-dialog-shown']) {
                $scope.showTipDialog('pets');
            }
        });

        window.debug = $scope;
    }]);
