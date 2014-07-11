'use strict';

angular.module('clientApp')
    .controller('ShopCtrl', ['$scope', '$rootScope', 'Treats', function ($scope, $rootScope, Treats) {
        $rootScope.bodyClass = 'shop';
        $scope.treats = Treats.all();
    }]);
