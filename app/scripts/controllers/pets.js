'use strict';

angular.module('clientApp')
  .controller('PetsCtrl', function ($scope, Instagram, $rootScope, $timeout) {

        $rootScope.bodyClass='pets';

        Instagram.tag.media('treatsforlife', function(res){
            $timeout(function(){
                $scope.photos = res.data;
                //todo - paging
            })
        });
    });
