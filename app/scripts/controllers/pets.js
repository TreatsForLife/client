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
                var gallerySlides = [];
                for (var p in $scope.photos){
                    var photo = $scope.photos[p];
                    var slide = {
                        src: photo.images.standard_resolution.url,
                        width: $scope.screenWidth,
                        height: $scope.screenWidth
                    }
                    gallerySlides.push(slide);
                }
                setupSwipe(gallerySlides, 'pet-pic');


                var treatsSlides = [];
                for (var i=0; i<3; i++) {
                    var treat = ['bone', 'ball', 'bed'][i];
                    var slide = {
                        src: 'images/' + treat + '.png',
                        width: $scope.grassHeight-50,
                    }
                    treatsSlides.push(slide);
                }
                setupSwipe(treatsSlides, 'pet-treat');

                $('#pet-treat img').on('click',function(){
                    $(this).attr('src', $(this).attr('src').replace('png','gif'));
                }).on('touch',function(){
                    $(this).attr('src', $(this).attr('src').replace('png','gif'));
                });

            },1000);
        });

        $scope.flip = function(){
            angular.element('.flipper').toggleClass('flip');
        }


        //------------| Util Functions |------------//
        function setupSwipe(slides, parent_id){
            var gallery = new SwipeView('#'+parent_id, { numberOfPages: slides.length });
            for (var i=0; i<3; i++) {
                var page = i==0 ? slides.length-1 : i-1;
                var el = document.createElement('img');
                el.className = 'loading';
                for (var p in slides[page]){
//                    el[p] = slides[page][p];
                    $(el).attr(p,slides[page][p]);
                }
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
                        el.src = slides[upcoming].src;
                    }
                }
            });
        }
    });

