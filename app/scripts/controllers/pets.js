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
        $scope.screenWidth = angular.element(window).width();

        Instagram.get(100).success(function (res) {
            $timeout(function(){
                $scope.photos = res.data;
            });
            $timeout(function(){
                $scope.slides = [];
                for (var p in $scope.photos){
                    var photo = $scope.photos[p];
                    var slide = {
                        img: photo.images.standard_resolution.url,
                        width: $scope.screenWidth,
                        height: $scope.screenWidth
                    }
                    $scope.slides.push(slide);
                }
                var gallery = new SwipeView('#pet-pic', { numberOfPages: $scope.slides.length });
                for (var i=0; i<3; i++) {
                    var page = i==0 ? $scope.slides.length-1 : i-1;
                    var el = document.createElement('img');
                    el.className = 'loading';
                    el.src = $scope.slides[page].img;
                    el.width = $scope.slides[page].width;
                    el.height = $scope.slides[page].width;
                    el.onload = function () { this.className = ''; }
                    gallery.masterPages[i].appendChild(el);
                }
                gallery.onFlip(function () {
                    var el, upcoming;
                    for (var i=0; i<3; i++) {
                        upcoming = gallery.masterPages[i].dataset.upcomingPageIndex;
                        if (upcoming != gallery.masterPages[i].dataset.pageIndex) {
                            el = gallery.masterPages[i].querySelector('img');
                            el.className = 'loading';
                            el.src = $scope.slides[upcoming].img;
                        }
                    }
                });
                gallery.onMoveOut(function () {
                    gallery.masterPages[gallery.currentMasterPage].className = gallery.masterPages[gallery.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/, '');
                });
                gallery.onMoveIn(function () {
                    var className = gallery.masterPages[gallery.currentMasterPage].className;
                    /(^|\s)swipeview-active(\s|$)/.test(className) || (gallery.masterPages[gallery.currentMasterPage].className = !className ? 'swipeview-active' : className + ' swipeview-active');
                });



            },1000);
        });

        $scope.flip = function(){
            angular.element('.flipper').toggleClass('flip');
        }

    });

