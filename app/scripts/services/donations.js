'use strict';

angular.module('clientApp')
    .factory('Donations', ['$resource', function ($resource) {
        return $resource(Consts.api_root + 'donation/:id', {}, {
            all: { method: 'GET', withCredentials: true, params: {}, isArray: true },
            query: { method: 'GET', withCredentials: true, params: {}, isArray: false },
            create: { method: 'POST' },
            approve: { method: 'POST', params: {id: 'approve'} },
            update: { method: 'PUT', withCredentials: true, params: {id: '@_id'} },
            remove: { method: 'DELETE', params: {id: '@_id'} }
        });
    }]);