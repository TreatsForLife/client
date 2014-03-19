'use strict';

angular.module('clientApp')
//  .controller('PetsCtrl', function ($scope, Instagram, $rootScope, $timeout) {
//
//        $rootScope.bodyClass='pets';
//
//        Instagram.tag.media('treatsforlife', function(res){
//            $timeout(function(){
//                $scope.photos = res.data;
//                //todo - paging
//            });
//            $timeout(function(){
//                window.mySwipe = new Swipe(document.getElementById('slider'), {
//                    startSlide: 2,
//                    speed: 400,
//                    auto: 3000,
//                    continuous: true,
//                    disableScroll: false,
//                    stopPropagation: false,
//                    callback: function(index, elem) {},
//                    transitionEnd: function(index, elem) {}
//                });
//            },1000);
//
//        });
//
//    });
    .controller('PetsCtrl', function ($scope, Instagram, $rootScope, $timeout) {

        $rootScope.bodyClass='pets';
        $scope.grassHeight = angular.element(window).height() - angular.element(window).width();

        Instagram.get(100).success(function (res) {
            $timeout(function(){
                $scope.photos = res.data;
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

                var sup1 = new SuperGif({ gif: document.getElementById('bone') } );
                sup1.load(function(){
                    sup1.pause();
                });

            },1000);
        });

        $scope.flip = function(){
            angular.element('.flipper').toggleClass('flip');
        }

    });

