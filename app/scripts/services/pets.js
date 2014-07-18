'use strict';

angular.module('clientApp')
    .factory('Pets', ['$resource', function ($resource) {
        return $resource(Consts.api_root + 'pet/:id', {}, {
            all: { method: 'GET', withCredentials: true, params: {}, isArray: true },
            lonely: { method: 'GET', withCredentials: true, params: {id: 'lonely'}, isArray: true },
            owned: { method: 'GET', withCredentials: true, params: {id: 'owned'}, isArray: true },
            query: { method: 'GET', withCredentials: true, params: {}, isArray: false },
            create: { method: 'POST' },
            update: { method: 'PUT', withCredentials: true, params: {id: '@_id'} },
            remove: { method: 'DELETE', params: {id: '@_id'} }
        });
    }]);