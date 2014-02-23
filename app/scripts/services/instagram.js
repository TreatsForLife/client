'use strict';

angular.module('clientApp')
.factory('Instagram', ['$http',
    function($http) {
        var base = "https://api.instagram.com/v1";
        var clientId = 'd9c1142d0ac14d1ea5a45bc8478006a4';
        var hashtag = "treatsforlife"
        return {
            'get': function(count) {
                var request = '/tags/' + hashtag + '/media/recent';
                var url = base + request;
                var config = {
                    'params': {
                        'client_id': clientId,
                        'count': count,
                        'callback': 'JSON_CALLBACK'
                    }
                };
                var res = $http.jsonp(url, config);
                console.log(res);
                return res;
            }
        };
    }
]);
