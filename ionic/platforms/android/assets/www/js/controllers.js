function storeUserAndRedirect(user) {
    console.log('storeUserAndRedirect called', user);
    if (typeof user == 'undefined' || !user || !user._id) return;
    localStorage.setItem('user_id', user._id);
    console.log('saved user_id cookie', localStorage['user_id'], user._id);
    $rootScope.user = user;
    console.log('saved user to scope', $rootScope.user, user);
    if (user.pet) {
        localStorage.setItem('user_pet_id', (user.pet ? user.pet._id : ''));
        console.log('saved user_pet_id cookie', localStorage['user_pet_id'], user.pet._id);
    }
    var returnUrl = localStorage.returnUrl;
    console.log('got return url from local storage', returnUrl);
    $timeout(function () {
        if (returnUrl && returnUrl != '/welcome') {
            localStorage.setItem("returnUrl", '');
            console.log('Redirecting to return url', returnUrl);
            $location.path(returnUrl);
        } else {
            console.log('Redirecting to /');
            $location.path('/');
        }
    }, 500);
}


angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
        console.log('DashCtrl');
        $scope.login = function(){
            console.log('login');
            facebookConnectPlugin.login(['email'], function (response) {
                console.log('FB login responded', response);
                if (response.authResponse) {
//                    console.log('Welcome!  Fetching your information.... ');
//                    $cookies['fb_at'] = response.authResponse.accessToken;
                    var fb_id = response.authResponse.userID;
                    localStorage.setItem('fb_id', fb_id);
                    console.log('saved fb_id cookie', localStorage['fb_id'], response.authResponse.userID);
                    FB.api('/me', function (response) {
                        console.log('fetched /me data from facebook - creating user', response);
                        Users.create({fb_id: fb_id, name: response.name, email: response.email, image: 'https://graph.facebook.com/' + response.username + '/picture'}, function (user) {
                            console.log('user created', user);
                            storeUserAndRedirect(user);
                        });
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });
        }
})


.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
