'use strict';

angular.module('clientApp')
    .controller('RootCtrl', function ($scope, $rootScope) {
        $scope.instajam = Instajam.init({
            clientId: '1e7c407bd22b435e8447b7607245a947',
            redirectUri: 'http://127.0.0.1:9000',
            scope: ['basic', 'comments']
        });
        $scope.instajam.user.self.profile(function (res) {
            console.log(res);
        });
        $rootScope.picHeight = $(window).width() * 0.6;

    });
