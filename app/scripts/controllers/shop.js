'use strict';

angular.module('clientApp')
    .controller('ShopCtrl', ['$scope', '$rootScope', 'Treats', function ($scope, $rootScope, Treats) {
        $rootScope.bodyClass = 'shop';
        $rootScope.navbarTitle = 'החנות';
        $scope.treats = Treats.all();

        $scope.totalToPay = function () {
            var total = 0;
            for (var treat,t=0; treat=$scope.treats[t]; t++) {
                if (treat.cart || treat.fixed) {
                    total += treat.price;
                }
            }
            return total;
        }


    }]);
