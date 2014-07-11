'use strict';

angular.module('clientApp')
    .controller('RootCtrl', ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {
        $scope.instajam = Instajam.init({
            clientId: '1e7c407bd22b435e8447b7607245a947',
            redirectUri: 'http://127.0.0.1:9000',
            scope: ['basic', 'comments']
        });
        $scope.instajam.user.self.profile(function (res) {
            console.log(res);
        });
        $rootScope.picHeight = $(window).width() * 0.7;

        $rootScope.goBack = function () {
            $scope.goingBack = true;
            $timeout(function(){
                $scope.goingBack = false;
            },1000);
            window.history.back();
        }

    }]);
