'use strict';

angular.module('clientApp')
  .controller('ShopCtrl', ['$scope', '$rootScope', '$routeParams', '$timeout', '$location', 'Treats', 'Pets', 'Donations', function ($scope, $rootScope, $routeParams, $timeout, $location, Treats, Pets, Donations) {

    var pet_id = $routeParams['pet_id'];
    var user_id = $routeParams['user_id'];

    $rootScope.bodyClass = 'shop';
    $rootScope.navbarTitle = 'החנות';

    $scope.cancelUrl = Consts.client_root + '#/shop/' + user_id + '/' + pet_id;
    $scope.returnUrl = Consts.client_root + '#/payed/' + pet_id;
    $scope.notifyUrl = Consts.api_root + 'donation';

    $scope.treats = Treats.all();

    var chosenTreats = [];

    if (!$scope.pet) {
      $scope.pet = Pets.one({id: pet_id});
    }

    $timeout(function () {
      $scope.showCheckout = true;
    }, 500);

    $scope.initCheckout = function () {
      $timeout(function () {
        //animate the checkout - do not remove there are problems with fixed position otherwise
        angular.element('.shop-checkout')
          .addClass('animated fadeInUp')

        //calc the cart (to include defaults)
        $scope.cartChanged();
      }, 500);
    }

    $scope.calcTotalToPay = function () {
      var total = 0;
      chosenTreats = [];
      for (var treat, t = 0; treat = $scope.treats[t]; t++) {
        if (treat.cart || treat.fixed) {
          total += treat.price;
          chosenTreats.push(treat);
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
    $scope.cartChanged = function (treat) {
      if (angular.isDefined(treat)) {
        console.log(treat.name);
        $timeout(function () {
          treat.cart = !treat.cart;
        });
      }
      $timeout(function () {
        $scope.totalToPay = $scope.calcTotalToPay();
        $scope.formattedItemName = $scope.formatItemName();
        $scope.ItemNumber = (new Date()).getTime();
        $scope.paymentActive = ($scope.totalToPay > 0);
      }, 100);
    }


    $scope.pay = function (fakeIt) {

      $scope.cartChanged();
      if (!$scope.paymentActive) return;
      $scope.paymentActive = false;

      clearDonations();

      var ItemNumber = $scope.ItemNumber;
      var created = 0;
      for (var t = 0, treat; treat = chosenTreats[t]; t++) {
        Donations.create({
          paypalItem: ItemNumber,
          treat: treat._id,
          pet: pet_id,
          user: user_id,
          payed: false
        }, function (res) {
          storeDonation(res._id);
          created++;
          if (created >= (chosenTreats.length)) {
            if (fakeIt) {
              document.location.href = ($scope.returnUrl + '?fake=1&item_number=' + $scope.ItemNumber);
            } else {
              angular.element('#payment-form').submit();
            }
          }
        });
      }

    }

    function storeDonation(id){
      var donations = JSON.parse(localStorage['donationsCreated'] || "[]");
      donations.unshift(id);
      localStorage['donationsCreated'] = JSON.stringify(donations);
    }
    function clearDonations(){
      localStorage['donationsCreated'] = [];
    }

  }]);
