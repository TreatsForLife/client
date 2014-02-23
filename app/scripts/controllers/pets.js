'use strict';

angular.module('clientApp')
  .controller('PetsCtrl', ['$scope', 'Instagram', function ($scope, Instagram) {
        Instagram.get(100).success(function(res){
            $scope.photos = res;
        });
  }]);
