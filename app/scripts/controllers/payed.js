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

    if (pet_id && $scope.donationsCreated.length > 0) {

      var approved = $scope.donationsCreated.length;
      for (var i = 0, donation; donation = $scope.donationsCreated[i]; i++) {
        Donations.approve({_id: donation}, function (res) {
          approved--;
          if (approved == 0) {
            localStorage['donationsCreated'] = [];
            document.location.href = ("treatsforlife://pet/" + pet_id + "/adopt");
          }
        });
      }
    }
  }]);
