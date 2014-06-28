'use strict';

angular.module('clientApp')
    .controller('PetCtrl', ['$scope', 'Pets', 'Donations', '$rootScope', '$routeParams', '$timeout', '$interval', '$sce', function ($scope, Pets, Donations, $rootScope, $routeParams, $timeout, $interval, $sce) {

        $rootScope.bodyClass = 'pet';
        $scope.grassHeight = 0;
        $scope.buttonAnimationReady = false;

        var pet_id = $routeParams['id'];
        var gif = null;
        var animationLength = 0;

        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        }

        Pets.query({id: pet_id}, function (pet) {
            $scope.pet = pet;
            $rootScope.navbarTitle = pet.name;
            $scope.donations = [];
            $scope.donations[0] = pet;

            Donations.all({pet_id: pet_id}, function (res) {
                $timeout(function () {
                    for (var i= 0, donation; donation = res[i]; i++){
                        $scope.donations.push(donation);
                    }
                });
                $timeout(function () {
                    window.videosSwipe = new Swipe(document.getElementById('slider'), {
                        startSlide: 0,
                        continuous: true,
                        disableScroll: true,
                        stopPropagation: false,
                        callback: function (index, elem) {
                        },
                        transitionEnd: function (index, elem) {
                        }
                    });
                    $scope.grassHeight = $(window).height() - $('#pet-pic').height() - $('#pet-pic').offset().top;
                    $scope.buttonHeight = Math.min($scope.grassHeight * 0.7, 150);
                    $scope.buttonMargin = ($scope.grassHeight - $scope.buttonHeight) / 2;

                }, 50);
                $timeout(function () {

                    gif = new SuperGif({ gif: document.getElementById('treat_button'), max_width: $scope.buttonHeight, auto_play: false });
                    gif.load(function () {
                        gif.pause();
                        animationLength = gif.get_length();
                        $timeout(function () {
                            $scope.buttonAnimationReady = true;
                        })
                    });

                }, 100);
            });
        });

        $scope.animateButton = function () {
            gif.play();
            var gifInterval = $interval(function () {
                if (gif.get_current_frame() >= animationLength - 1) {
                    gif.pause();
                    $interval.cancel(gifInterval);
                }
            }, 20);
        }

        $scope.flip = function () {
            angular.element('.flipper').toggleClass('flip');
        }

        $scope.treats = ['bone'];
        $scope.animationStatus = {};
        for (var t in $scope.treats) {
            var treat = $scope.treats[t];
            $scope.animationStatus[treat] = 'first';
        }

        $scope.startAnimation = function (treat) {
            $scope.animationStatus[treat] = 'animate';
            $timeout(function () {
                $scope.animationStatus[treat] = 'last';
                $scope.showTipDialog('treat-dialog');
            }, 1200);
        }

        $scope.menu = [
            {name: 'אוכל לשבוע', price: 20, cart: true, fixed: true},
            {name: 'עצם לעיסה קטנה', price: 10},
            {name: 'עצם לעיסה גדולה', price: 20},
            {name: 'כדור צעצוע', price: 10},
            {name: 'חבל משיכה', price: 20},
            {name: 'אמפולה נגד פשפשים', price: 50},
            {name: 'קולר נגד פשפשים', price: 100}
        ];

        $scope.totalToPay = function () {
            var total = 0;
            for (var t in $scope.menu) {
                var treat = $scope.menu[t];
                if (treat.cart || treat.fixed) {
                    total += treat.price;
                }
            }
            return total;
        }

        window.debug = $scope;

    }]);

