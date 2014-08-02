var Utils={isLocal:document.location.host.search("localhost")>-1||document.location.host.search("lvh.me")>-1,isBchmn:document.location.host.search("bchmn.com")>-1,isHeroku:document.location.host.search("herokuapp.com")>-1,findIdInArray:function(a,b,c){"undefined"==typeof c&&(c="_id");for(var d,e=0;d=a[e];e++)if(d[c]==b)return d;return!1}},Consts={debug:!0,api_root:Utils.isLocal?"http://localhost:3000/":"http://tfl.bchmn.com/",client_root:Utils.isLocal?"http://localhost:9000/":"http://treatsforlife.org/",fb_app_id:Utils.isLocal?"262700727225341":"601219569953172"};String.prototype.toMMSS=function(){var a=parseInt(this,10),b=Math.floor(a/60),c=a-60*b;10>b&&(b="0"+b),10>c&&(c="0"+c);var d=b+":"+c;return d},angular.module("clientApp",["ngCookies","ngResource","ngSanitize","ngTouch","ngRoute","ngAnimate","timer","seo"]).config(["$routeProvider","$compileProvider",function(a,b){b.aHrefSanitizationWhitelist(/^\s*(https?|http?|ftp|mailto|file|tel):/),a.when("/welcome",{templateUrl:"views/welcome.html",controller:"WelcomeCtrl"}).when("/pet",{templateUrl:"views/pet.html",controller:"PetCtrl",reloadOnSearch:!1}).when("/pet/:id",{templateUrl:"views/pet.html",controller:"PetCtrl",reloadOnSearch:!1}).when("/shop/:id",{templateUrl:"views/shop.html",controller:"ShopCtrl",reloadOnSearch:!1}).when("/pets",{templateUrl:"views/pets.html",controller:"PetsCtrl",reloadOnSearch:!1}).when("/pets/:filter",{templateUrl:"views/pets.html",controller:"PetsCtrl",reloadOnSearch:!1}).when("/",{templateUrl:"views/pets.html",controller:"PetsCtrl",reloadOnSearch:!1}).otherwise({redirectTo:"/"})}]).run(["$location","$cookies",function(a,b){a.path().length<=1&&(console.log("$cookies",b.fb_user),a.path(b.fb_id&&"w"!=a.search().s?b.user_pet_id?"/pet":"/pets":"/welcome"))}]),angular.module("clientApp").controller("RootCtrl",["$scope","$rootScope","$timeout","$cookies","$location","$sce","Donations","Users",function(a,b,c,d,e,f,g,h){console.log("APP VERSION: 1.0"),a.isWeb=angular.element(window).width()>700,console.log("Getting data from cookies",d),b.fb_id=d.fb_id,b.user_id=d.user_id,b.user_pet_id=d.user_pet_id,b.getUser=function(){h.query({id:b.user_id},function(c){c._id?(console.log("Found user in DB",c),b.user=c,a.$broadcast("userIsFetched"),!d.user_id&&b.user&&b.user._id&&(d.user_id=b.user._id,console.log("Saving user_id cookie",b.user._id,d.user_id)),!d.user_pet_id&&b.user&&b.user.pet&&b.user.pet._id&&(d.user_pet_id=b.user.pet._id,console.log("Saving user_pet_id cookie",b.user.pet._id,d.user_pet_id))):(console.log("No user in DB - redirecting to welcome screen",d),localStorage.setItem("returnUrl",e.path()),e.path("/welcome"))})},!b.user&&b.user_id?(console.log("No user but user_id cookie is found - fetching from DB"),c(function(){b.getUser()})):b.user_id||(console.log("No user_id cookies found - redirecting to welcome screen",d),localStorage.setItem("returnUrl",e.path()),e.path("/welcome")),b.trustSrc=function(a){return f.trustAsResourceUrl(a)},b.goBack=function(){c(function(){a.goingBack=!0},0),c(function(){a.goingBack=!1},1e3),window.history.back()},a.playVideo=function(b){c(function(){a.$broadcast("setVideoSrc",f.trustAsResourceUrl(b))},0)},b.openPushMenu=function(){angular.element("body").addClass("pushed"),angular.element("#menuRight").addClass("cbp-spmenu-open"),e.search({push:"1"})},b.closePushMenu=function(){angular.element("body").removeClass("pushed"),angular.element("#menuRight").removeClass("cbp-spmenu-open"),e.search({push:null})},b.$on("$routeUpdate",function(){e.search().dialog||b.closeDialog(),e.search().push||b.closePushMenu()}),b.showDialog=function(b){c(function(){a.$broadcast("showTipDialog",b),a.$emit("showTipDialog",b)},0)},b.closeDialog=function(b){c(function(){a.$broadcast("closeTipDialog",b),a.$emit("closeTipDialog",b)},0)},c(function(){a.canAnimate=!0,b.windowHeight=$(window).height(),b.containerWidth=$(".container").width(),b.picHeight=.6*$(".container").width()},5),c(function(){window.scrollTo(0,1)},1e3)}]),angular.module("clientApp").factory("Instagram",["$http",function(a){var b="https://api.instagram.com/v1",c="d9c1142d0ac14d1ea5a45bc8478006a4",d="treatsforlife";return{get:function(e){var f="/tags/"+d+"/media/recent",g=b+f,h={params:{client_id:c,count:e,callback:"JSON_CALLBACK"}},i=a.jsonp(g,h);return console.log(i),i}}}]),angular.module("clientApp").factory("Pets",["$resource",function(a){return a(Consts.api_root+"pet/:id",{},{all:{method:"GET",withCredentials:!0,params:{},isArray:!0},lonely:{method:"GET",withCredentials:!0,params:{id:"lonely"},isArray:!0},adopted:{method:"GET",withCredentials:!0,params:{id:"adopted"},isArray:!0},addOwner:{method:"PUT",withCredentials:!0,params:{id:"@_id"},isArray:!1},one:{method:"GET",withCredentials:!0,params:{},isArray:!1},query:{method:"GET",withCredentials:!0,params:{},isArray:!0},create:{method:"POST"},update:{method:"PUT",withCredentials:!0,params:{id:"@_id"}},remove:{method:"DELETE",params:{id:"@_id"}}})}]),angular.module("clientApp").controller("PetCtrl",["$scope","Pets","Donations","Treats","Users","$rootScope","$routeParams","$timeout","$interval","$sce","$location",function(a,b,c,d,e,f,g,h,i,j,k){function l(){f.user?a.getPetId():a.$on("userIsFetched",function(){a.getPetId()})}function m(b){"undefined"==typeof b&&(b=5),h(function(){var c=100;a.grassHeight=a.windowHeight-(a.picHeight+62)-30-(a.showCart?50:0),a.buttonHeight=a.buttonWidth=Math.min(parseInt(.9*(a.grassHeight-20)),150),a.buttonMargin=(a.grassHeight-a.buttonHeight)/2,a.buttonHeight<c&&(a.buttonHeight=a.buttonWidth=c,a.buttonMargin=20,a.grassHeight=c+2*a.buttonMargin,a.picHeight=a.windowHeight-(a.grassHeight+62)-30-(a.showCart?50:0)),b>0&&h(function(){m(b-1)},1e3)})}f.bodyClass="pet",a.grassHeight=0,a.buttonAnimationReady=!1,a.buttonClicked=!1,a.picHeight=.6*$(".container").width(),a.cartIsUp=!1,a.getPetId=function(){a.pet_id=g.id||f.user_pet_id,!a.pet_id&&f.user&&f.user.pet&&f.user.pet._id&&(a.pet_id=f.user.pet._id),a.pet_id?a.getPet():k.path("/pets")},a.getPet=function(){b.one({id:a.pet_id},function(b){f.pet=b,f.navbarTitle=b.name,a.donations=[],a.donations[0]=b,c.given({pet_id:a.pet_id},function(b){h(function(){for(var c,d=0;c=b[d];d++)a.donations.push(c)}),h(function(){window.videosSwipe=new Swipe(document.getElementById("slider"),{startSlide:0,continuous:!0,disableScroll:!0,stopPropagation:!1,callback:function(){},transitionEnd:function(){}})},50),h(function(){a.getPendingItems=function(){c.pending({pet_id:a.pet_id},function(b){h(function(){a.pending=b,a.showCart=b.length>0,a.cartTitle=b.length+" "+(b.length>0?"פריטים":"פריט"),m()})})};var b=k.search();b.item_number?c.approve({item_number:b.item_number},function(b){a.getPendingItems(),k.search({}),a.getPet(),a.getUser(),b.newAdoption&&a.greetAdoption()}):a.getPendingItems()},80)})})},a.greetAdoption=function(){a.showDialog("adopted")},a.adopt=function(){a.showDialog("adopt")},a.share=function(){var b=Consts.client_root+"#/pet/"+a.pet_id;FB.ui({method:"feed",app_id:Consts.fb_app_id,display:a.isWeb?"popup":"touch",link:b,picture:a.pet.media.image,name:"נעים מאוד להכיר, אני "+a.pet.name,caption:"תמיד רצית לאמץ כלב ולא יכולת בגלל 1042 סיבות? מצאנו דרך שתוכלו לעזור, להציל חיים או לפחות לעשות אותם קצת יותר קלים עבורם. בואו תראו.",description:" ",actions:[{name:"תנו לי חטיף",link:b}]},function(){})},a.like=function(){var b=Consts.client_root+"#/pet/"+a.pet_id;FB.ui({method:"feed",app_id:Consts.fb_app_id,to:a.pet.user.fb_id,display:a.isWeb?"popup":"touch",link:b,picture:a.pet.media.image,name:a.pet.name+" הזה הרס אותי עכשיו ",caption:"איזה יופי של סרטונים, למות :)",description:" ",actions:[{name:"תנו לי חטיף",link:b}]},function(){})},a.adopted=function(){var b=Consts.client_root+"#/pet/"+a.pet_id;FB.ui({method:"feed",app_id:Consts.fb_app_id,display:a.isWeb?"popup":"touch",link:b,picture:a.pet.media.image,name:"אתם לא מבינים מה עשיתי הרגע",caption:"אימצתי כלב! קוראים לו "+a.pet.name+" ולא הוא לא יבוא אליי הביתה. לא כרגע לפחות.. אבל הולך לקבל ים פינוקים ממני. מומלץ בחום לראות את הפרוייקט הזה",description:" ",actions:[{name:"בואו לראות אותי",link:b}]},function(){})};var n=i(function(){a.user&&a.pet&&(a.pet.user&&a.pet.user._id==a.user_id?(a.showButton="buy",f.bodyClass+=" mine"):!a.pet.user&&a.user.pet?(a.showButton="share",f.bodyClass+=" lonely"):a.pet.user&&a.pet.user._id!=a.user_id?(a.showButton="love",f.bodyClass+=" adopted"):a.pet.user||a.user.pet?a.showButton=!1:(a.showButton="adopt",f.bodyClass+=" lonely"),a.showButton&&i.cancel(n))},250);a.animateButton=function(){if(a.showButton)var b=1700,c=48,d=c,e=a.buttonHeight,f=0,g=i(function(){return 0==d?(i.cancel(g),void k.path("/shop/"+a.pet_id)):(angular.element(".pet-buy-button").css("background-position-x",-1*f),d--,void(f+=e))},b/c)},a.animateShareButton=function(){if(a.showButton)var b=1e3,c=25,d=c,e=a.buttonHeight,f=0,g=i(function(){return 0==d?(i.cancel(g),void h(function(){a.share(),angular.element(".pet-share-button").css("background-position-x",0)},500)):(angular.element(".pet-share-button").css("background-position-x",-1*f),d--,void(f+=e))},b/c)},a.animateLikeButton=function(){if(a.showButton)var b=1e3,c=34,d=c,e=a.buttonHeight,f=0,g=i(function(){return 0==d?(i.cancel(g),void h(function(){a.like(),angular.element(".pet-like-button").css("background-position-x",0)},500)):(angular.element(".pet-like-button").css("background-position-x",-1*f),d--,void(f+=e))},b/c)},a.animateAdoptButton=function(){if(a.showButton){a.animatingAdopt=!1;var b=1700,c=34,d=c,e=a.buttonHeight,f=0;angular.element(".pet-adopt-button-gif").hide(),angular.element(".pet-adopt-button").show();var g=i(function(){return 0==d?(i.cancel(g),h(function(){a.adopt()},100),void h(function(){angular.element(".pet-adopt-button-gif").show(),angular.element(".pet-adopt-button").hide(),angular.element(".pet-adopt-button").css("background-position-x",0)},1e3)):(angular.element(".pet-adopt-button").css("background-position-x",-1*f),d--,void(f+=e))},b/c)}},a.flip=function(){angular.element(".flipper").toggleClass("flip")},a.nextFriday=moment().hour(0).minute(0).second(0).add("days",2).weekday(5).add("hours",12).format(),l(),window.debug=a}]),angular.module("clientApp").controller("PetsCtrl",["$scope","$rootScope","$timeout","$routeParams","$location","Pets",function(a,b,c,d,e,f){b.bodyClass="pets",a.picHeight=.6*$(".container").width();var g=d.filter;"adopted"==g?(b.navbarTitle="כלבים מאומצים",a.pets=f.adopted(),b.bodyClass+=" adopted"):"lonely"==g?(b.navbarTitle="כלבים בודדים",a.pets=f.lonely(),b.bodyClass+=" lonely"):a.user?e.path("/"+(a.user.pet?"pet":"pets/lonely")):a.$on("userIsFetched",function(){e.path("/"+(a.user.pet?"pet":"pets/lonely"))}),a.$on("userIsFetched",function(){c(function(){"lonely"!=g||a.user.pet||a.showDialog("pets")})}),window.debug=a}]),angular.module("clientApp").controller("WelcomeCtrl",["$scope","$rootScope","$cookies","$timeout","$interval","$location","Users",function(a,b,c,d,e,f,g){function h(a){if(console.log("storeUserAndRedirect called",a),"undefined"!=typeof a&&a&&a._id){c.user_id=a._id,console.log("saved user_id cookie",c.user_id,a._id),b.user=a,console.log("saved user to scope",b.user,a),a.pet&&(c.user_pet_id=a.pet?a.pet._id:"",console.log("saved user_pet_id cookie",c.user_pet_id,a.pet._id));var e=localStorage.getItem("returnUrl");console.log("got return url from local storage",e),d(function(){e&&"/welcome"!=e?(localStorage.setItem("returnUrl",""),console.log("Redirecting to return url",e),f.path(e)):(console.log("Redirecting to /"),f.path("/"))},500)}}b.bodyClass="welcome",a.placeLogo=function(c){"undefined"==typeof c&&(c=5),d(function(){angular.element(".welcome-app-explained").length>0&&(b.windowHeight=angular.element(window).height(),b.windowWidth=angular.element(window).width(),a.logoSpace=b.windowHeight-angular.element(".bottom-wrapper").height(),a.logoHeight=a.logoSpace>370?370:a.logoSpace-80,a.logoMargin=parseInt((a.logoSpace-a.logoHeight)/2)+"px auto",a.logoWidth=parseInt(a.logoHeight/370*266)),c>0&&d(function(){a.placeLogo(c-1)},1e3)})},a.logoAnimationComplete=!1,a.animateLogo=function(){var b=1700,c=48,f=c,g=a.logoWidth,h=0,i=e(function(){return 0==f?(e.cancel(i),void d(function(){a.logoAnimationComplete=!0})):(angular.element(".welcome-logo-animation").css("background-position-x",-1*h),f--,void(h+=g))},b/c)},d(function(){a.animateLogo()},500),a.fbLogin=function(){"undefined"!=typeof FB&&FB&&FB.login(function(a){if(console.log("FB login responded",a),a.authResponse){var b=c.fb_id=a.authResponse.userID;console.log("saved fb_id cookie",c.fb_id,a.authResponse.userID),FB.api("/me",function(a){console.log("fetched /me data from facebook - creating user",a),g.create({fb_id:b,name:a.name,email:a.email,image:"https://graph.facebook.com/"+a.username+"/picture"},function(a){console.log("user created",a),h(a)})})}else console.log("User cancelled login or did not fully authorize.")})},d(function(){"undefined"!=typeof FB&&FB&&FB.getLoginStatus(function(a){if(console.log("Response arrived from facebook",a),"connected"===a.status){console.log("the user is logged in and has authenticated your app",a.authResponse);var d=c.fb_id=a.authResponse.userID,e=b.user;e?(console.log("User found in scope",b.user),h(e)):(console.log("User not found in scope - fetching from db - by fb_id",a.authResponse.userID),g.all({fb_id:a.authResponse.userID},function(a){console.log("Users found in db",a),e=a[0],e?(console.log("User found in db",e),h(e)):FB.api("/me",function(a){console.log("fetched /me data from facebook - creating user",a),g.create({fb_id:d,name:a.name,email:a.email,image:"https://graph.facebook.com/"+a.username+"/picture"},function(a){console.log("user created",a),h(a)})})}))}else console.log("not_authorized"===a.status?"the user is logged in to Facebook, but has not authenticated your app":"the user isnt logged in to Facebook")})},500),window.debug=a}]),angular.module("clientApp").directive("draggable",["$document",function(a){return{restrict:"A",link:function(b,c){function d(a){k=a.pageY-g+i,j=a.pageX-f+h,c.css({top:k+"px",left:j+"px"})}function e(){a.unbind("mousemove",d),a.unbind("mouseup",e)}var f=0,g=0,h=0,i=0,j=0,k=0;c.on("mousedown",function(b){b.preventDefault(),f=b.pageX,g=b.pageY,h=c.offset().left,i=c.offset().top,a.on("mousemove",d),a.on("mouseup",e)})}}}]),angular.module("clientApp").directive("tipDialog",["$timeout","$location",function(a,b){return{template:'<div class="tip-dialog-container" ng-show="shown"><div class="tip-dialog-wrapper"><div class="tip-dialog animated bounce{{!leaving ? \'InDown\' : \'OutUp\'}}"><div class="tip-dialog-content rtl" ng-include="contentUrl"></div></div><div class="tip-dialog-point animated bounce{{!leaving ? \'InDown\' : \'OutUp\'}}"></div><div class="tip-dialog-dog animated bounce{{!leaving ? \'InUp\' : \'OutDown\'}}" ng-style="{backgroundImage: \'url(images/logo.png)\'}"></div><div class="tip-dialog-x animated fade{{!leaving ? \'In\' : \'Out\'}}" ng-click="closeTipDialog()"> סגור <i class="fa fa-times"></i></div></div></div>',restrict:"E",link:function(c){c.shown=!1,c.leaving=!1,c.watched={},c.$on("showTipDialog",function(d,e,f){(f||!c.watched[e])&&(a(function(){c.contentUrl="views/partials/"+e+"-dialog.html",c.shown=!0},100),b.search({dialog:"1"}),c.watched[e]=!0)}),c.closeTipDialog=function(){c.leaving=!0,a(function(){c.shown=!1,c.leaving=!1},1e3),b.search({dialog:null})},c.$on("closeTipDialog",function(){c.closeTipDialog()})}}}]),angular.module("clientApp").factory("Users",["$resource",function(a){return a(Consts.api_root+"user/:id",{},{all:{method:"GET",params:{},isArray:!0},query:{method:"GET",withCredentials:!0,params:{},isArray:!1},create:{method:"POST",withCredentials:!0},addPet:{method:"PUT",withCredentials:!0,params:{id:"@_id"},isArray:!1},update:{method:"PUT",withCredentials:!0,params:{id:"@_id"}},remove:{method:"DELETE",withCredentials:!0,params:{id:"@_id"}}})}]),angular.module("clientApp").factory("Donations",["$resource",function(a){return a(Consts.api_root+"donation/:id",{},{all:{method:"GET",withCredentials:!0,params:{},isArray:!0},query:{method:"GET",withCredentials:!0,params:{},isArray:!1},given:{method:"GET",withCredentials:!0,params:{id:"given"},isArray:!0},pending:{method:"GET",withCredentials:!0,params:{id:"pending"},isArray:!0},create:{method:"POST"},approve:{method:"POST",params:{id:"approve"}},update:{method:"PUT",withCredentials:!0,params:{id:"@_id"}},remove:{method:"DELETE",params:{id:"@_id"}}})}]),angular.module("clientApp").controller("ShopCtrl",["$scope","$rootScope","$routeParams","$timeout","$location","Treats","Pets","Donations",function(a,b,c,d,e,f,g,h){var i=c.id||b.user_pet_id;b.bodyClass="shop",b.navbarTitle="החנות",a.returnUrl=Consts.client_root+"#/pet/"+i,a.notifyUrl=Consts.api_root+"donation",a.treats=f.all();var j=[];d(function(){!window.localStorage["shop-dialog-shown"]}),a.pet||(a.pet=g.one({id:i})),d(function(){a.showCheckout=!0},500),a.initCheckout=function(){d(function(){angular.element(".shop-checkout").addClass("animated fadeInUp"),a.cartChanged()},500)},a.calcTotalToPay=function(){var b=0;j=[];for(var c,d=0;c=a.treats[d];d++)(c.cart||c.fixed)&&(b+=c.price,j.push(c));return b},a.formatItemName=function(){for(var b,c=" עבור "+a.pet.name,d=[],e=0;b=a.treats[e];e++)(b.cart||b.fixed)&&d.push(b.name);if(d.length>1){var f=d[0],g=d.slice(1);c=g.join(", ")+" ו"+f+c}else c=d[0]+c;return c},a.totalToPay=0;var k=!1;a.cartChanged=function(b){return k?void(k=!1):(b?d(function(){a.treats[b].cart=!a.treats[b].cart}):k=!0,a.totalToPay=a.calcTotalToPay(),a.formattedItemName=a.formatItemName(),a.ItemNumber=(new Date).getTime(),void(a.paymentActive=a.totalToPay>0))},a.pay=function(b){if(a.cartChanged(),a.paymentActive){a.paymentActive=!1;for(var c,d=0,e=0;c=j[e];e++)h.create({paypalItem:a.ItemNumber,treat:c._id,user:a.user._id,pet:a.pet._id,payed:!1},function(){d++,d>=j.length&&(b?document.location.href=a.returnUrl+"?fake=1&item_number="+a.ItemNumber:angular.element("#payment-form").submit())})}}}]),angular.module("clientApp").factory("Treats",["$resource",function(a){return a(Consts.api_root+"treat/:id",{},{all:{method:"GET",withCredentials:!0,params:{},isArray:!0},query:{method:"GET",withCredentials:!0,params:{},isArray:!1},create:{method:"POST"},update:{method:"PUT",withCredentials:!0,params:{id:"@_id"}},remove:{method:"DELETE",params:{id:"@_id"}}})}]),angular.module("clientApp").directive("player",["$location","$timeout",function(a,b){return{restrict:"AE",scope:{show:"=",videoSrc:"=",isEditMode:"="},template:'<div id="dialog-video" class="dialog-video" ng-show="show" bindonce bo-class="{preview: !isMobile}"><video id="video-player" ng-src="{{videoSrc}}" ng-click="toggleVideo()"></video><div id="video-loading-indicator" ng-if="isVideoBuffering">Loading<i class="fa fa-spinner fa-spin"></i></div><div id="video-controls-wrapper"><div class="video-controls"><div class="video-controls-section playback"><i ng-hide="isPlaying" ng-click="playVideo()" class="fa fa-play fa-fw"></i><i ng-show="isPlaying" ng-click="pauseVideo()" class="fa fa-pause fa-fw"></i></div><div class="video-controls-section progress-wrapper"><div id="progressbar" class="video-progress-total" ng-click="seekVideo($event)"><div id="progress-current" class="video-progress-current" ng-style="{width: currentPosition}"></div></div></div><span class="video-position-indicator" ng-bind="currentTime"></span></div></div><button class="dialog-video-close" ng-click="closeDialog()"><i class="fa fa-fw fa-times"></i></button></div>',link:function(a){a.isVideoLoaded=a.isPlaying=a.isMuted=!1,a.isVideoBuffering=!0,a.currentTime="0:00",a.currentPosition=0;var c,d,e,f,g,h=!1;a.$watch("show",function(a,b){a!==!0||!angular.isUndefined(b)&&b!==!1||j()}),a.$on("setVideoSrc",function(b,c){a.videoSrc=c,a.show=!0});var i=!1,j=function(){return i?(a.currentTime="0:00",a.currentPosition=0,void(a.$root.isMobile||(k(),c.volume=1))):(i=!0,c=document.getElementById("video-player"),a.$root.isMobile||(k(),c.volume=1),c.addEventListener("canplaythrough",l),c.addEventListener("playing",m),c.addEventListener("timeupdate",n),c.addEventListener("pause",o),c.addEventListener("seeking",function(){b(function(){a.isVideoBuffering=!0})}),c.addEventListener("seeked",function(){b(function(){a.isVideoBuffering=!1})}),a.currentTime="0:00",a.currentPosition=0,d=document.getElementById("progressbar"),f=d.clientWidth,void(g=d.offsetLeft))},k=function(){h=!0};a.$on("mo.orientationchange",function(){f=d.clientWidth,g=d.offsetLeft});var l=function(){console.log("Video can play event"),b(function(){a.isVideoLoaded=!0,a.isVideoBuffering=!1}),console.log("Video play"),c.play(),e=!0},m=function(){console.log("Video playing event"),b(function(){a.isPlaying=!0})},n=function(){b(function(){a.currentPosition=c.currentTime*f/c.duration,a.currentTime=c.currentTime.toString().toMMSS()})},o=function(){console.log("Video paused event"),a.$apply(function(){b(function(){a.isPlaying=!1})})};a.toggleVideo=function(){e?a.pauseVideo():a.playVideo()},a.playVideo=function(){angular.isDefined(c)&&(console.log("play video action",c),c.ended&&(a.currentTime="0:00",a.currentPosition=0),c.play(),e=!0)},a.pauseVideo=function(){console.log("pause video action"),angular.isDefined(c)&&(c.pause(),e=!1)},a.seekVideo=function(b){console.log("seek video action"),angular.isDefined(c)&&a.isPlaying&&(c.currentTime=(b.clientX-g)*c.duration/f)},a.closeDialog=function(){a.pauseVideo(),b(function(){a.show=a.isVideoLoaded=a.isPlaying=a.isMuted=!1,a.isVideoLoaded=!0,a.currentTime="0:00",a.currentPosition=0}),a.$emit("mo.video-dialog-closed"),angular.element("body").css("overflow","auto")},a.$on("closeDialog",function(){a.closeDialog()})}}}]);