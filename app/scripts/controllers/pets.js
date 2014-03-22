'use strict';

angular.module('clientApp')
    .controller('PetsCtrl', function ($scope, $rootScope, Instagram, $timeout) {
        $rootScope.bodyClass = 'pets';

        Instagram.get(10).success(function (res) {
            $timeout(function () {
                $scope.footage = [];
                for (var i in res.data) {
                    if ($scope.footage.length > 9) break;
                    var inst = res.data[i];
                    var item = {};
                    item['photo_url'] = inst.images.standard_resolution.url;
//                    item['video_url'] = inst.videos ? inst.videos.standard_resolution.url : false;
//                    item['inst_link'] = inst.link;
                    $scope.footage.push(item);
                }
            });
            $timeout(function () {
                $scope.showTipDialog('adopt');
            },1500);
        });

    });
