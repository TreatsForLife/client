'use strict';

angular.module('clientApp')
.factory('Instagram', ['$http',
    function() {
        return Instajam.init({
            clientId: '1e7c407bd22b435e8447b7607245a947',
            redirectUri: 'http://127.0.0.1:9000',
            scope: ['basic', 'comments']
        });
    }
]);
