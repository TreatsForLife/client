'use strict';

angular.module('clientApp')
    .controller('PetsCtrl', ['$scope', '$rootScope', '$timeout', 'Pets', function ($scope, $rootScope, $timeout, Pets) {
        $rootScope.bodyClass = 'pets';
        $rootScope.navbarTitle = 'כלבים בודדים';

        $scope.picHeight = $('.container').width() * 0.6;
        $scope.pets = Pets.all();

        $timeout(function () {
            if (!window.localStorage['pets-dialog-shown']) {
                $scope.showTipDialog('pets');
            }
        });

        window.debug = $scope;
    }]);
