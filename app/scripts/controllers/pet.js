'use strict';

angular.module('clientApp')
    .controller('PetCtrl', function ($scope, Instagram, $rootScope, $timeout, $sce) {

        $rootScope.bodyClass='pets';
        $scope.grassHeight = angular.element(window).height() - angular.element(window).width();
        $scope.picHeight = angular.element(window).width();

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }

        Instagram.get(100).success(function (res) {
            $timeout(function(){
                $scope.footage = [];
                for (var i in res.data){
                    if ($scope.footage.length > 9) break;
                    var inst = res.data[i];
                    var item = {};
                    item['photo_url'] = inst.images.standard_resolution.url;
                    item['video_url'] = inst.videos ? inst.videos.standard_resolution.url : false;
                    item['inst_link'] = inst.link;
                    $scope.footage.push(item);
                }
                console.log($scope.footage);
            });
            $timeout(function(){
                window.videosSwipe = new Swipe(document.getElementById('slider'), {
                    startSlide: 0,
                    continuous: true,
                    disableScroll: true,
                    stopPropagation: false,
                    callback: function(index, elem) {},
                    transitionEnd: function(index, elem) {}
                });
                window.treatsSwipe = new Swipe(document.getElementById('slider-treats'), {
                    startSlide: 0,
                    continuous: true,
                    disableScroll: true,
                    stopPropagation: false,
                    callback: function(index, elem) {},
                    transitionEnd: function(index, elem) {}
                });

/*
                var sup1 = new SuperGif({ gif: document.getElementById('bone') } );
                sup1.load(function(){
                    sup1.pause();
                });
*/

            },1000);
        });

        $scope.flip = function(){
            angular.element('.flipper').toggleClass('flip');
        }

        $scope.treats = ['bone'];
        $scope.animationStatus = {};
        for (var t in $scope.treats){
            var treat = $scope.treats[t];
            $scope.animationStatus[treat] = 'first';
        }

        $scope.startAnimation = function(treat){
            $scope.animationStatus[treat] = 'animate';
            $timeout(function(){
                $scope.animationStatus[treat] = 'last';
                $scope.showTipDialog();
            }, 1200);

        }

    });

