'use strict';

angular.module('clientApp')
    .controller('ShopCtrl', ['$scope', '$rootScope', 'Treats', function ($scope, $rootScope, Treats) {
        $rootScope.bodyClass = 'shop';
        $rootScope.navbarTitle = 'החנות';
        $scope.treats = Treats.all();
    }]);
