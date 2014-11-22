'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:PayedCtrl
 * @description
 * # PayedCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('PayedCtrl', ['$scope', '$rootScope', '$routeParams', 'Donations', function ($scope, $rootScope, $routeParams, Donations) {

    $rootScope.bodyClass = 'shop';

    var pet_id = $routeParams['pet_id'];

    $scope.donationsCreated = JSON.parse(localStorage['donationsCreated'] || "[]");

    console.log('Donationis found: ', $scope.donationsCreated);
    if (pet_id && $scope.donationsCreated.length > 0) {

      var approved = $scope.donationsCreated.length;
      for (var i = 0, donation; donation = $scope.donationsCreated[i]; i++) {
        console.log('Approving donation: ', donation);
        Donations.approve({_id: donation}, function (res) {
          approved--;
          console.log('Approved donation: ', res);
          if (approved == 0) {
            console.log('Done. Clearing donations: ', localStorage['donationsCreated']);
            localStorage['donationsCreated'] = [];

            var path = "treatsforlife://pet/" + pet_id + "/adopt";
            console.log('Redirecting to: ', path);
            document.location.href = (path);
          }
        });
      }
    }
  }]);
