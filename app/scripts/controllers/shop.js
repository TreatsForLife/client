'use strict';

angular.module('clientApp')
  .controller('ShopCtrl', ['$scope', 'Treats', function ($scope, Treats) {
      $scope.treats = Treats.all();
  }]);
