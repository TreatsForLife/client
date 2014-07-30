'use strict';

angular.module('clientApp')
    .controller('PetCtrl', ['$scope', 'Pets', 'Donations', 'Treats', 'Users', '$rootScope', '$routeParams', '$timeout', '$interval', '$sce', '$location', function ($scope, Pets, Donations, Treats, Users, $rootScope, $routeParams, $timeout, $interval, $sce, $location) {

        $rootScope.bodyClass = 'pet';
        $scope.grassHeight = 0;
        $scope.buttonAnimationReady = false;
        $scope.buttonClicked = false;
        $scope.picHeight = $('.container').width() * 0.6;
        $scope.cartIsUp = false;

        //search pet in route or in cookie

        function init() {
            if ($rootScope.user) {
                $scope.getPetId();
            } else {
                $scope.$on('userIsFetched', function () {
                    //check if the user has a pet
                    $scope.getPetId();
                });
            }
        }

        $timeout(function () {
            if (!window.localStorage['pet-dialog-shown']) {
                $scope.showTipDialog('pet');
            }
        });

        $scope.getPetId = function () {
            $scope.pet_id = $routeParams['id'] || $rootScope.user_pet_id;
            if (!$scope.pet_id && $rootScope.user && $rootScope.user.pet && $rootScope.user.pet._id) {
                $scope.pet_id = $rootScope.user.pet._id;
            }
            if (!$scope.pet_id) {
                $location.path('/pets');
            } else {
                $scope.getPet();
            }
        }

        $scope.getPet = function () {
            Pets.one({id: $scope.pet_id}, function (pet) {
                $scope.pet = pet;
                $rootScope.navbarTitle = pet.name;
                $scope.donations = [];
                $scope.donations[0] = pet;

                Donations.given({pet_id: $scope.pet_id}, function (res) {
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
                        //get pending items
                        $scope.getPendingItems = function () {
                            Donations.pending({pet_id: $scope.pet_id}, function (res) {
                                $timeout(function () {
                                    $scope.pending = res;
                                    $scope.showCart = (res.length > 0);
                                    $scope.cartTitle = res.length + ' ' + ((res.length > 0) ? 'פריטים' : 'פריט');

//                                $scope.htmlReady(); //flags phantom js that the page is ready

                                    calcDims();
                                });
                            });
                        }

                        //aprove paypal payments & get pending items from db
                        var q = $location.search();
                        if (q['item_number']) {
                            Donations.approve({item_number: q['item_number']}, function (res) {
                                $scope.getPendingItems();
                                $location.search({});
                                $scope.getPet();
                                $scope.getUser();
                                if (res.newAdoption) {
                                    $scope.greetAdoption();
                                }
                            });
                        } else {
                            $scope.getPendingItems();
                        }


                    }, 80);


                });
            });
        }

        function calcDims(iterations) {
            if (typeof iterations == 'undefined') iterations = 5;

            $timeout(function () {
                var min_button_height = 100;
                $scope.grassHeight = $scope.windowHeight - ($scope.picHeight + 62) - 30 - ($scope.showCart ? 50 : 0);
                $scope.buttonHeight = $scope.buttonWidth = Math.min(parseInt(($scope.grassHeight - 20) * 0.9), 150);
                $scope.buttonMargin = ($scope.grassHeight - $scope.buttonHeight) / 2;
                if ($scope.buttonHeight < min_button_height) {
                    $scope.buttonHeight = $scope.buttonWidth = min_button_height;
                    $scope.buttonMargin = 20;
                    $scope.grassHeight = min_button_height + ($scope.buttonMargin * 2);
                    $scope.picHeight = $scope.windowHeight - ($scope.grassHeight + 62) - 30 - ($scope.showCart ? 50 : 0);
                }

                if (iterations > 0) {
                    $timeout(function () {
                        calcDims(iterations - 1);
                    }, 1000);
                }
            });

        }

        $scope.greetAdoption = function () {
            $scope.$broadcast('showTipDialog', 'adopted');
        };

        $scope.adopt = function () {
            $scope.$broadcast('showTipDialog', 'adopt');
        }

        $scope.share = function () {
            var pet_link = Consts.client_root + '#/pet/' + $scope.pet_id;
            FB.ui({
                method: 'feed',
                app_id: Consts.fb_app_id,
                display: ($scope.isWeb ? 'popup' : 'touch'),
                link: pet_link,//$scope.pet.media.link,
                picture: $scope.pet.media.image,
                name: 'תכירו את ' + $scope.pet.name,
                caption: 'תמיד רצית לאמץ כלב ולא יכולת? זאת ההזדמנות שלך להציל חיים, או לפחות לעשות אותם קצת יותר טובים. קנו ל' + $scope.pet.name + ' חטיף, צעצוע ושאר מתנות ועשו לו קצת כיף. מבטיחים לשלוח סרטון של הרגע הגדול :)',
                description: ' ',
                actions: [
                    {name: 'תנו לי חטיף', link: pet_link}
                ],
            }, function (response) {
            });
        }

        $scope.like = function () {
            var pet_link = Consts.client_root + '#/pet/' + $scope.pet_id;
            FB.ui({
                method: 'feed',
                app_id: Consts.fb_app_id,
                to: $scope.pet.user.fb_id,
                display: ($scope.isWeb ? 'popup' : 'touch'),
                link: pet_link,//$scope.pet.media.link,
                picture: $scope.pet.media.image,
                name: 'תראו איזה כלב מקסים ' + $scope.pet.name,
                caption: 'איזה יופי של סרטונים, למות :)',
                description: ' ',
                actions: [
                    {name: 'תנו לי חטיף', link: pet_link}
                ],
            }, function (response) {
            });
        }

        $scope.adopted = function () {
            var pet_link = Consts.client_root + '#/pet/' + $scope.pet_id;
            FB.ui({
                method: 'feed',
                app_id: Consts.fb_app_id,
                display: ($scope.isWeb ? 'popup' : 'touch'),
                link: pet_link,//$scope.pet.media.link,
                picture: $scope.pet.media.image,
                name: 'תכירו את ' + $scope.pet.name,
                caption: 'תמיד רצית לאמץ כלב ולא יכולת? זאת ההזדמנות שלך להציל חיים, או לפחות לעשות אותם קצת יותר טובים. קנו ל' + $scope.pet.name + ' חטיף, צעצוע ושאר מתנות ועשו לו קצת כיף. מבטיחים לשלוח סרטון של הרגע הגדול :)',
                description: ' ',
                actions: [
                    {name: 'בואו לראות אותי', link: pet_link}
                ],
            }, function (response) {
            });
        }

        var showButtonInterval = $interval(function () {
            if (!$scope.user || !$scope.pet) return;
            if (!!($scope.pet.user && ($scope.pet.user._id == $scope.user_id))) {
                // BUY : if its my pet
                $scope.showButton = 'buy';
                $rootScope.bodyClass += ' mine';
            } else if (!!(!$scope.pet.user && $scope.user.pet)) {
                // SHARE : if I have a pet and the pet has no owner
                $scope.showButton = 'share';
                $rootScope.bodyClass += ' lonely';
            } else if (!!($scope.pet.user && ($scope.pet.user._id != $scope.user_id))) {
                // LOVE : if the pet has owner and its not me
                $scope.showButton = 'love';
                $rootScope.bodyClass += ' adopted';
            } else if (!$scope.pet.user && !$scope.user.pet) {
                //ADOPT : if I have no pet and the this pet has no owner
                $scope.showButton = 'adopt';
                $rootScope.bodyClass += ' lonely';
            } else {
                $scope.showButton = false;
            }
            if ($scope.showButton)
                $interval.cancel(showButtonInterval);

        }, 250);

        $scope.animateButton = function () {
            if (!$scope.showButton) return;
            var animationDuration = 1700;
            var numOfFrames = 48;
            var frame = numOfFrames;
            var dim = $scope.buttonHeight;
            var animationBgPosition = 0;
            var animationInterval = $interval(function () {
                if (frame == 0) {
                    $interval.cancel(animationInterval);
                    $location.path('/shop/' + $scope.pet_id);
                    return;
                }
                angular.element('.pet-buy-button').css('background-position-x', -1 * animationBgPosition);
                frame--;
                animationBgPosition += dim;
            }, (animationDuration / numOfFrames))
        }

        $scope.animateShareButton = function () {
            if (!$scope.showButton) return;
            var animationDuration = 1000;
            var numOfFrames = 25;
            var frame = numOfFrames;
            var dim = $scope.buttonHeight;
            var animationBgPosition = 0;
            var animationInterval = $interval(function () {
                if (frame == 0) {
                    $interval.cancel(animationInterval);
                    $timeout(function () {
                        $scope.share();
                        angular.element('.pet-share-button').css('background-position-x', 0);
                    }, 500);
                    return;
                }
                angular.element('.pet-share-button').css('background-position-x', -1 * animationBgPosition);
                frame--;
                animationBgPosition += dim;
            }, (animationDuration / numOfFrames))
        }

        $scope.animateLikeButton = function () {
            if (!$scope.showButton) return;
            var animationDuration = 1000;
            var numOfFrames = 34;
            var frame = numOfFrames;
            var dim = $scope.buttonHeight;
            var animationBgPosition = 0;
            var animationInterval = $interval(function () {
                if (frame == 0) {
                    $interval.cancel(animationInterval);
                    $timeout(function () {
                        $scope.like();
                        angular.element('.pet-like-button').css('background-position-x', 0);
                    }, 500);
                    return;
                }
                angular.element('.pet-like-button').css('background-position-x', -1 * animationBgPosition);
                frame--;
                animationBgPosition += dim;
            }, (animationDuration / numOfFrames))
        }

        $scope.animateAdoptButton = function () {
            if (!$scope.showButton) return;
            $scope.animatingAdopt = false;
            var animationDuration = 1700;
            var numOfFrames = 34;
            var frame = numOfFrames;
            var dim = $scope.buttonHeight;
            var animationBgPosition = 0;
            angular.element('.pet-adopt-button-gif').hide();
            angular.element('.pet-adopt-button').show();
            var animationInterval = $interval(function () {
                if (frame == 0) {
                    $interval.cancel(animationInterval);
                    $timeout(function () {
                        $scope.adopt();
                    }, 100);
                    $timeout(function () {
                        angular.element('.pet-adopt-button-gif').show();
                        angular.element('.pet-adopt-button').hide();
                        angular.element('.pet-adopt-button').css('background-position-x', 0);
                    }, 1000);
                    return;
                }
                angular.element('.pet-adopt-button').css('background-position-x', -1 * animationBgPosition);
                frame--;
                animationBgPosition += dim;
            }, (animationDuration / numOfFrames))
        }

        $scope.flip = function () {
            angular.element('.flipper').toggleClass('flip');
        }

        //calc next friday at 12:00
        $scope.nextFriday = moment().hour(0).minute(0).second(0).add('days', 2).weekday(5).add('hours', 12).format();

        init();

        window.debug = $scope;

    }]);

