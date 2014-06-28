'use strict';

angular.module('clientApp')
    .factory('Pets', ['$resource', function ($resource) {
        return $resource(Consts.api_root + 'pet/:id', {}, {
            all: { method: 'GET', withCredentials: true, params: {}, isArray: true },
            query: { method: 'GET', withCredentials: true, params: {}, isArray: false },
            create: { method: 'POST' },
            update: { method: 'PUT', withCredentials: true, params: {id: '@_id'} },
            remove: { method: 'DELETE', params: {id: '@_id'} }
        });
    }]);