'use strict';

angular.module('clientApp')
    .controller('PetCtrl', ['$scope', 'Pets', 'Donations', '$rootScope', '$routeParams', '$timeout', '$interval', '$sce', '$location', function ($scope, Pets, Donations, $rootScope, $routeParams, $timeout, $interval, $sce, $location) {

        $rootScope.bodyClass = 'pet';
        $scope.grassHeight = 0;
        $scope.buttonAnimationReady = false;

        var pet_id = $routeParams['id'] || $rootScope.user_pet_id;
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
                    for (var i = 0, donation; donation = res[i]; i++) {
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

                    $scope.buttonAnimationReady = true;
                    $timeout(function () {
                        gif = new SuperGif({ gif: document.getElementById('treat_button'), max_width: $scope.buttonHeight, auto_play: false });
                        gif.load(function () {
                            gif.pause();
                            animationLength = gif.get_length();
                            $timeout(function () {
                                $scope.buttonAnimationReady = true;
                                angular.element('.treat-wrapper').show();
                            })
                        });
                    });

                }, 100);
            });
        });

        $scope.playVideo = function (src) {
            $scope.show_player = true;
            $scope.player_src = $sce.trustAsResourceUrl(src);
        }
        $scope.animateButton = function () {
            gif.play();
            var gifInterval = $interval(function () {
                if (gif.get_current_frame() >= animationLength - 1) {
                    gif.pause();
                    $location.path('/shop/' + pet_id);
                    $interval.cancel(gifInterval);
                }
            }, 20);
        }

        $scope.flip = function () {
            angular.element('.flipper').toggleClass('flip');
        }

        //calc next friday at 12:00
        $scope.nextFriday = moment().hour(0).minute(0).second(0).add('days', 1).weekday(5).add('hours', 12).format();

        /*
         $scope.nextFriday =
         ((new Date.getTime()) / (24*60*60*1000))

         new Date(1405152513000);

         */
        window.debug = $scope;

    }]);

