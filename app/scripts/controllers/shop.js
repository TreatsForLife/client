'use strict';

angular.module('clientApp')
    .controller('ShopCtrl', ['$scope', '$rootScope', '$routeParams', 'Treats', 'Pets', function ($scope, $rootScope, $routeParams, Treats, Pets) {

        var pet_id = $routeParams['id'];

        $rootScope.bodyClass = 'shop';
        $rootScope.navbarTitle = 'החנות';
        $scope.treats = Treats.all();

        if (!$scope.pet){
            $scope.pet = Pets.query({id: pet_id});
        }

        $scope.calcTotalToPay = function () {
            var total = 0;
            for (var treat, t = 0; treat = $scope.treats[t]; t++) {
                if (treat.cart || treat.fixed) {
                    total += treat.price;
                }
            }
            return total;
        }

        $scope.formatItemName = function () {
            var name = ' עבור ' + $scope.pet.name;
            var names = [];
            for (var treat, t = 0; treat = $scope.treats[t]; t++) {
                if (treat.cart || treat.fixed) {
                    names.push(treat.name);
                }
            }
            if (names.length > 1){
                var last = names[0];
                var rest = names.slice(1);
                name = rest.join(', ') + ' ו' + last + name;
            }else{
                name = names[0] + name;
            }
            return name;
        }

        $scope.totalToPay = 0;
        $scope.cartChanged = function () {
            $scope.totalToPay = $scope.calcTotalToPay();
            $scope.formattedItemName = $scope.formatItemName();
            $scope.ItemNumber = (new Date()).getTime();
            $scope.paymentActive = ($scope.totalToPay>0);
        }

        $scope.pay = function(){
            if (!$scope.paymentActive) return;
            $scope.cartChanged();
            angular.element('#payment-form').submit();
        }

    }]);
