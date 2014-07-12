'use strict';

angular.module('clientApp')
    .controller('ShopCtrl', ['$scope', '$rootScope', '$routeParams', '$timeout', 'Treats', 'Pets', function ($scope, $rootScope, $routeParams, $timeout, Treats, Pets) {

        var pet_id = $routeParams['id'];

        $rootScope.bodyClass = 'shop';
        $rootScope.navbarTitle = 'החנות';

        $scope.returnUrl = Consts.client_root + '#/shop/' + pet_id;
        $scope.notifyUrl = Consts.api_root + 'donation';

        $scope.treats = Treats.all();


        if (!$scope.pet) {
            $scope.pet = Pets.query({id: pet_id});
        }

        $scope.initCheckout = function () {
            $timeout(function () {
                //animate the checkout - do not remove there are problems with fixed position otherwise
                angular.element('.shop-checkout')
                    .addClass('animated fadeInUp')
                    .css('position', 'fixed');

                //calc the cart (to include defaults)
                $scope.cartChanged();
            }, 500);
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
            if (names.length > 1) {
                var last = names[0];
                var rest = names.slice(1);
                name = rest.join(', ') + ' ו' + last + name;
            } else {
                name = names[0] + name;
            }
            return name;
        }

        $scope.totalToPay = 0;
        $scope.cartChanged = function () {
            $scope.totalToPay = $scope.calcTotalToPay();
            $scope.formattedItemName = $scope.formatItemName();
            $scope.ItemNumber = (new Date()).getTime();
            $scope.paymentActive = ($scope.totalToPay > 0);
        }

        $scope.pay = function () {
            $scope.cartChanged();
            if (!$scope.paymentActive) return;
            $scope.paymentActive = false;
            angular.element('#payment-form').submit();
        }

    }]);
