'use strict';

angular.module('clientApp')
  .controller('RootCtrl', function ($scope) {
    $scope.instajam = Instajam.init({
        clientId: '1e7c407bd22b435e8447b7607245a947',
        redirectUri: 'http://127.0.0.1:9000',
        scope: ['basic', 'comments']
    });
    console.log($scope.instajam);
    $scope.instajam.user.self.profile(function(res){
        console.log(res);
    });

});
