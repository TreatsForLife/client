'use strict';

angular.module('clientApp')
    .controller('PetCtrl', ['$scope', 'Pets', 'Donations', '$rootScope', '$routeParams', '$timeout', '$interval', '$sce', '$location', function ($scope, Pets, Donations, $rootScope, $routeParams, $timeout, $interval, $sce, $location) {

        $rootScope.bodyClass = 'pet';
        $scope.grassHeight = 0;
        $scope.buttonAnimationReady = false;
        $scope.buttonClicked = false;
        $scope.picHeight = $('.container').width() * 0.6;

        var pet_id = $routeParams['id'] || $rootScope.user_pet_id;
        if (!pet_id && $rootScope.user && $rootScope.user.pet && $rootScope.user.pet._id)
            pet_id = $rootScope.user.pet._id;

        var animationLength = 0;

        $timeout(function () {
            if (!window.localStorage['pet-dialog-shown']) {
                $scope.showTipDialog('pet');
            }
        });

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


                }, 50);
                $timeout(function () {

                    $scope.grassHeight = $scope.windowHeight - ($scope.picHeight + 62) - 40 - 50;
                    $scope.buttonHeight = $scope.buttonWidth = Math.min($scope.grassHeight * 0.9, 150);
                    $scope.buttonMargin = ($scope.grassHeight - $scope.buttonHeight) / 2;

                    $scope.gif = new SuperGif({ gif: document.getElementById('treat_button'), max_width: $scope.buttonWidth, auto_play: false });
                    $scope.gif.load(function () {
                        $scope.gif.pause();
                        animationLength = $scope.gif.get_length();
                        $timeout(function () {
                            if (!$scope.buttonClicked) //do not show animation if the button was already clicked
                                $scope.buttonAnimationReady = true;
                        })
                    });

                }, 100);

            });
        });

        $scope.playVideo = function (src) {
            $scope.show_player = true;
            $scope.player_src = $sce.trustAsResourceUrl(src);
        }
        $scope.animateButton = function (ready) {
            if (ready) {
                $scope.gif.play();
                var gifInterval = $interval(function () {
                    if ($scope.gif.get_current_frame() >= animationLength - 1) {
                        $scope.gif.pause();
                        $location.path('/shop/' + pet_id);
                        $interval.cancel(gifInterval);
                    }
                }, 20);
            } else {
                $timeout(function () {
                    $scope.buttonClicked = true;
                });
                $timeout(function () {
                    $location.path('/shop/' + pet_id);
                }, 500);
            }
        }

        $scope.flip = function () {
            angular.element('.flipper').toggleClass('flip');
        }

        //calc next friday at 12:00
        $scope.nextFriday = moment().hour(0).minute(0).second(0).add('days', 1).weekday(5).add('hours', 12).format();

        window.debug = $scope;

    }]);

