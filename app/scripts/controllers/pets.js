'use strict';

angular.module('clientApp')
    .controller('PetsCtrl', ['$scope', '$rootScope', '$timeout', '$routeParams', '$location', 'Pets', function ($scope, $rootScope, $timeout, $routeParams, $location, Pets) {
        $rootScope.bodyClass = 'pets';
        $scope.picHeight = $('.container').width() * 0.6;

        var filter = $routeParams['filter'];

        if (filter == 'adopted') {
            $rootScope.navbarTitle = 'כלבים מאומצים';
            $scope.pets = Pets.adopted();
            $rootScope.bodyClass += ' adopted';
        } else if (filter == 'lonely') {
            $rootScope.navbarTitle = 'כלבים בודדים';
            $scope.pets = Pets.lonely();
            $rootScope.bodyClass += ' lonely';
        } else {
            if ($scope.user) {
                $location.path('/pets' + ($scope.user.pet ? '' : '/lonely'));
            } else {
                $scope.$on('userIsFetched', function () {
                    $location.path('/pets' + ($scope.user.pet ? '' : '/lonely'));
                });
            }
        }

        $timeout(function () {
            if (!window.localStorage['pets-dialog-shown']) {
                $scope.showTipDialog('pets');
            }
        });

        window.debug = $scope;
    }]);
