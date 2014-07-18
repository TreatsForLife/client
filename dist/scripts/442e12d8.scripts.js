var Utils={isLocal:document.location.host.search("localhost")>-1||document.location.host.search("lvh.me")>-1,isBchmn:document.location.host.search("bchmn.com")>-1,isHeroku:document.location.host.search("herokuapp.com")>-1,findIdInArray:function(a,b,c){"undefined"==typeof c&&(c="_id");for(var d,e=0;d=a[e];e++)if(d[c]==b)return d;return!1}},Consts={api_root:Utils.isBchmn?"http://tfl.bchmn.com/":Utils.isHeroku?"http://treatsforlife-api.herokuapp.com/":"http://localhost:3000/",client_root:Utils.isBchmn?"http://tfl-client.bchmn.com/":Utils.isHeroku?"http://treatsforlife.herokuapp.com/":"http://localhost:9000/",fb_app_id:Utils.isLocal?"262700727225341":"601219569953172"};String.prototype.toMMSS=function(){var a=parseInt(this,10),b=Math.floor(a/60),c=a-60*b;10>b&&(b="0"+b),10>c&&(c="0"+c);var d=b+":"+c;return d},angular.module("clientApp",["ngCookies","ngResource","ngSanitize","ngTouch","ngRoute","ngAnimate","timer"]).config(["$routeProvider","$compileProvider",function(a,b){b.aHrefSanitizationWhitelist(/^\s*(https?|http?|ftp|mailto|file|tel):/),a.when("/welcome",{templateUrl:"views/welcome.html",controller:"WelcomeCtrl"}).when("/pet",{templateUrl:"views/pet.html",controller:"PetCtrl"}).when("/pet/:id",{templateUrl:"views/pet.html",controller:"PetCtrl"}).when("/shop/:id",{templateUrl:"views/shop.html",controller:"ShopCtrl"}).when("/pets",{templateUrl:"views/pets.html",controller:"PetsCtrl"}).when("/pets/:filter",{templateUrl:"views/pets.html",controller:"PetsCtrl"}).when("/",{templateUrl:"views/pets.html",controller:"PetsCtrl"}).otherwise({redirectTo:"/"})}]).run(["$location","$cookies",function(a,b){"/"==a.path()&&(console.log("$cookies",b.fb_user),a.path(b.fb_id&&"w"!=a.search().s?b.user_pet_id?"/pet":"/pets/lonely":"/welcome"))}]),angular.module("clientApp").controller("RootCtrl",["$scope","$rootScope","$timeout","$cookies","$location","Donations","Users",function(a,b,c,d,e,f,g){b.fb_id=d.fb_id,b.user_id=d.user_id,b.user_pet_id=d.user_pet_id,!b.user&&b.user_id?b.user=g.get({id:b.user_id},function(){}):b.user_id||e.path("/welcome");var h=e.search();h.item_number&&(f.approve({item_number:h.item_number}),e.search({})),b.goBack=function(){a.goingBack=!0,c(function(){a.goingBack=!1},1e3),window.history.back()},b.openPushMenu=function(){angular.element("body").addClass("pushed"),angular.element("#menuRight").addClass("cbp-spmenu-open")},b.closePushMenu=function(){angular.element("body").removeClass("pushed"),angular.element("#menuRight").removeClass("cbp-spmenu-open")},c(function(){a.canAnimate=!0,b.windowHeight=$(window).height(),b.containerWidth=$(".container").width(),b.picHeight=.6*$(".container").width()},5)}]),angular.module("clientApp").factory("Instagram",["$http",function(a){var b="https://api.instagram.com/v1",c="d9c1142d0ac14d1ea5a45bc8478006a4",d="treatsforlife";return{get:function(e){var f="/tags/"+d+"/media/recent",g=b+f,h={params:{client_id:c,count:e,callback:"JSON_CALLBACK"}},i=a.jsonp(g,h);return console.log(i),i}}}]),angular.module("clientApp").factory("Pets",["$resource",function(a){return a(Consts.api_root+"pet/:id",{},{all:{method:"GET",withCredentials:!0,params:{},isArray:!0},lonely:{method:"GET",withCredentials:!0,params:{id:"lonely"},isArray:!0},owned:{method:"GET",withCredentials:!0,params:{id:"owned"},isArray:!0},query:{method:"GET",withCredentials:!0,params:{},isArray:!1},create:{method:"POST"},update:{method:"PUT",withCredentials:!0,params:{id:"@_id"}},remove:{method:"DELETE",params:{id:"@_id"}}})}]),angular.module("clientApp").controller("PetCtrl",["$scope","Pets","Donations","$rootScope","$routeParams","$timeout","$interval","$sce","$location",function(a,b,c,d,e,f,g,h,i){d.bodyClass="pet",a.grassHeight=0,a.buttonAnimationReady=!1,a.buttonClicked=!1,a.picHeight=.6*$(".container").width();var j=e.id||d.user_pet_id;!j&&d.user&&d.user.pet&&d.user.pet._id&&(j=d.user.pet._id);var k=0;f(function(){window.localStorage["pet-dialog-shown"]||a.showTipDialog("pet")}),a.trustSrc=function(a){return h.trustAsResourceUrl(a)},b.query({id:j},function(b){a.pet=b,d.navbarTitle=b.name,a.donations=[],a.donations[0]=b,c.all({pet_id:j},function(b){f(function(){for(var c,d=0;c=b[d];d++)a.donations.push(c)}),f(function(){window.videosSwipe=new Swipe(document.getElementById("slider"),{startSlide:0,continuous:!0,disableScroll:!0,stopPropagation:!1,callback:function(){},transitionEnd:function(){}})},50),f(function(){a.grassHeight=a.windowHeight-(a.picHeight+62)-40-50,a.buttonHeight=a.buttonWidth=Math.min(.9*a.grassHeight,150),a.buttonMargin=(a.grassHeight-a.buttonHeight)/2,a.gif=new SuperGif({gif:document.getElementById("treat_button"),max_width:a.buttonWidth,auto_play:!1}),a.gif.load(function(){a.gif.pause(),k=a.gif.get_length(),f(function(){a.buttonClicked||(a.buttonAnimationReady=!0)})})},100)})}),a.playVideo=function(b){a.show_player=!0,a.player_src=h.trustAsResourceUrl(b)},a.animateButton=function(b){if(b){a.gif.play();var c=g(function(){a.gif.get_current_frame()>=k-1&&(a.gif.pause(),i.path("/shop/"+j),g.cancel(c))},20)}else f(function(){a.buttonClicked=!0}),f(function(){i.path("/shop/"+j)},500)},a.flip=function(){angular.element(".flipper").toggleClass("flip")},a.nextFriday=moment().hour(0).minute(0).second(0).add("days",1).weekday(5).add("hours",12).format(),window.debug=a}]),angular.module("clientApp").controller("PetsCtrl",["$scope","$rootScope","$timeout","$routeParams","Pets",function(a,b,c,d,e){b.bodyClass="pets",a.picHeight=.6*$(".container").width();var f=d.filter;"owned"==f?(b.navbarTitle="כלבים מאומצים",a.pets=e.owned()):(b.navbarTitle="כלבים בודדים",a.pets=e.lonely()),c(function(){window.localStorage["pets-dialog-shown"]||a.showTipDialog("pets")}),window.debug=a}]),angular.module("clientApp").controller("WelcomeCtrl",["$scope","$rootScope","$cookies","$timeout","$location","Users",function(a,b,c,d,e,f){b.bodyClass="welcome",a.placeLogo=function(){d(function(){a.logoSpace=$(".welcome-app-explained").offset().top,a.logoHeight=(a.logoSpace-196)/2,a.logoMargin=(a.logoSpace-196)/2+"px auto",a.logoMargin=(a.logoSpace-196)/2+"px auto"})},a.fbLogin=function(){"undefined"!=typeof FB&&FB&&FB.login(function(a){a.authResponse?(c.fb_at=a.authResponse.accessToken,c.fb_id=a.authResponse.userID,FB.api("/me",function(a){f.create({name:a.name,email:a.email,image:"https://graph.facebook.com/"+a.username+"/picture"},function(a){c.user_id=a._id,b.user=a,a.pet&&(c.user_pet_id=a.pet)}),e.path("/")})):console.log("User cancelled login or did not fully authorize.")})},window.debug=a}]),angular.module("clientApp").directive("draggable",["$document",function(a){return{restrict:"A",link:function(b,c){function d(a){k=a.pageY-g+i,j=a.pageX-f+h,c.css({top:k+"px",left:j+"px"})}function e(){a.unbind("mousemove",d),a.unbind("mouseup",e)}var f=0,g=0,h=0,i=0,j=0,k=0;c.on("mousedown",function(b){b.preventDefault(),f=b.pageX,g=b.pageY,h=c.offset().left,i=c.offset().top,a.on("mousemove",d),a.on("mouseup",e)})}}}]),angular.module("clientApp").directive("tipDialog",["$timeout",function(a){return{template:'<div class="tip-dialog-container" ng-show="shown"><div class="tip-dialog-wrapper"><div class="tip-dialog animated bounce{{!leaving ? \'InDown\' : \'OutUp\'}}"><div class="rtl" ng-include="contentUrl"></div></div><div class="tip-dialog-point animated bounce{{!leaving ? \'InDown\' : \'OutUp\'}}"></div><div class="tip-dialog-dog animated bounce{{!leaving ? \'InUp\' : \'OutDown\'}}" ng-style="{backgroundImage: \'url(images/logo.png)\'}"></div><div class="tip-dialog-x animated fade{{!leaving ? \'In\' : \'Out\'}}" ng-click="closeTipDialog()"> סגור <i class="fa fa-times"></i></div></div></div>',restrict:"E",link:function(b){b.showTipDialog=function(c){a(function(){b.contentUrl="views/partials/"+c+"-dialog.html",b.shown=!0})},b.closeTipDialog=function(){b.leaving=!0,a(function(){b.shown=!1,b.leaving=!1},1e3)}}}}]),angular.module("clientApp").factory("Users",["$resource",function(a){return a(Consts.api_root+"user/:id",{},{all:{method:"GET",params:{},isArray:!0},query:{method:"GET",params:{},isArray:!1},create:{method:"POST",withCredentials:!0},update:{method:"PUT",withCredentials:!0,params:{id:"@_id"}},remove:{method:"DELETE",withCredentials:!0,params:{id:"@_id"}}})}]),angular.module("clientApp").factory("Donations",["$resource",function(a){return a(Consts.api_root+"donation/:id",{},{all:{method:"GET",withCredentials:!0,params:{},isArray:!0},query:{method:"GET",withCredentials:!0,params:{},isArray:!1},create:{method:"POST"},approve:{method:"POST",params:{id:"approve"}},update:{method:"PUT",withCredentials:!0,params:{id:"@_id"}},remove:{method:"DELETE",params:{id:"@_id"}}})}]),angular.module("clientApp").controller("ShopCtrl",["$scope","$rootScope","$routeParams","$timeout","Treats","Pets","Donations",function(a,b,c,d,e,f,g){var h=c.id||b.user_pet_id;b.bodyClass="shop",b.navbarTitle="החנות",a.returnUrl=Consts.client_root+"#/shop/"+h,a.notifyUrl=Consts.api_root+"donation",a.treats=e.all();var i=[];d(function(){window.localStorage["shop-dialog-shown"]||a.showTipDialog("shop")}),a.pet||(a.pet=f.query({id:h})),d(function(){a.showCheckout=!0},500),a.initCheckout=function(){d(function(){angular.element(".shop-checkout").addClass("animated fadeInUp"),a.cartChanged()},500)},a.calcTotalToPay=function(){var b=0;i=[];for(var c,d=0;c=a.treats[d];d++)(c.cart||c.fixed)&&(b+=c.price,i.push(c));return b},a.formatItemName=function(){for(var b,c=" עבור "+a.pet.name,d=[],e=0;b=a.treats[e];e++)(b.cart||b.fixed)&&d.push(b.name);if(d.length>1){var f=d[0],g=d.slice(1);c=g.join(", ")+" ו"+f+c}else c=d[0]+c;return c},a.totalToPay=0,a.cartChanged=function(){a.totalToPay=a.calcTotalToPay(),a.formattedItemName=a.formatItemName(),a.ItemNumber=(new Date).getTime(),a.paymentActive=a.totalToPay>0},a.pay=function(){if(a.cartChanged(),a.paymentActive){a.paymentActive=!1;for(var c,d=0,e=0;c=i[e];e++)g.create({paypalItem:a.ItemNumber,treat:c._id,user:b.user_id.replace(/\"/g,""),pet:a.pet._id},function(){d++,d>=i.length&&angular.element("#payment-form").submit()})}}}]),angular.module("clientApp").factory("Treats",["$resource",function(a){return a(Consts.api_root+"treat/:id",{},{all:{method:"GET",withCredentials:!0,params:{},isArray:!0},query:{method:"GET",withCredentials:!0,params:{},isArray:!1},create:{method:"POST"},update:{method:"PUT",withCredentials:!0,params:{id:"@_id"}},remove:{method:"DELETE",params:{id:"@_id"}}})}]),angular.module("clientApp").directive("player",["$location","$timeout",function(a,b){return{restrict:"AE",scope:{show:"=",videoSrc:"=",isEditMode:"="},template:'<div id="dialog-video" class="dialog-video" ng-show="show" bindonce bo-class="{preview: !isMobile}"><video id="video-player" ng-src="{{videoSrc}}" ng-click="toggleVideo()"></video><div id="video-loading-indicator" ng-if="isVideoBuffering">Loading<i class="fa fa-spinner fa-spin"></i></div><div id="video-controls-wrapper"><div class="video-controls"><div class="video-controls-section playback"><i ng-hide="isPlaying" ng-click="playVideo()" class="fa fa-play fa-fw"></i><i ng-show="isPlaying" ng-click="pauseVideo()" class="fa fa-pause fa-fw"></i></div><div class="video-controls-section progress-wrapper"><div id="progressbar" class="video-progress-total" ng-click="seekVideo($event)"><div id="progress-current" class="video-progress-current" ng-style="{width: currentPosition}"></div></div></div><span class="video-position-indicator" ng-bind="currentTime"></span></div></div><button class="dialog-video-close" ng-click="closeDialog()"><i class="fa fa-fw fa-times"></i></button></div>',link:function(a){a.isVideoLoaded=a.isPlaying=a.isMuted=!1,a.isVideoBuffering=!0,a.currentTime="0:00",a.currentPosition=0;var c,d,e,f,g,h=!1;a.$watch("show",function(a,b){a!==!0||!angular.isUndefined(b)&&b!==!1||j()});var i=!1,j=function(){return i?(a.currentTime="0:00",a.currentPosition=0,void(a.$root.isMobile||(k(),c.volume=1))):(i=!0,c=document.getElementById("video-player"),a.$root.isMobile||(k(),c.volume=1),c.addEventListener("canplaythrough",l),c.addEventListener("playing",m),c.addEventListener("timeupdate",n),c.addEventListener("pause",o),c.addEventListener("seeking",function(){b(function(){a.isVideoBuffering=!0})}),c.addEventListener("seeked",function(){b(function(){a.isVideoBuffering=!1})}),a.currentTime="0:00",a.currentPosition=0,d=document.getElementById("progressbar"),f=d.clientWidth,void(g=d.offsetLeft))},k=function(){h=!0};a.$on("mo.orientationchange",function(){f=d.clientWidth,g=d.offsetLeft});var l=function(){console.log("Video can play event"),b(function(){a.isVideoLoaded=!0,a.isVideoBuffering=!1}),console.log("Video play"),c.play(),e=!0},m=function(){console.log("Video playing event"),b(function(){a.isPlaying=!0})},n=function(){b(function(){a.currentPosition=c.currentTime*f/c.duration,a.currentTime=c.currentTime.toString().toMMSS()})},o=function(){console.log("Video paused event"),a.$apply(function(){b(function(){a.isPlaying=!1})})};a.toggleVideo=function(){e?a.pauseVideo():a.playVideo()},a.playVideo=function(){angular.isDefined(c)&&(console.log("play video action",c),c.ended&&(a.currentTime="0:00",a.currentPosition=0),c.play(),e=!0)},a.pauseVideo=function(){console.log("pause video action"),angular.isDefined(c)&&(c.pause(),e=!1)},a.seekVideo=function(b){console.log("seek video action"),angular.isDefined(c)&&a.isPlaying&&(c.currentTime=(b.clientX-g)*c.duration/f)},a.closeDialog=function(){a.pauseVideo(),b(function(){a.show=a.isVideoLoaded=a.isPlaying=a.isMuted=!1,a.isVideoLoaded=!0,a.currentTime="0:00",a.currentPosition=0}),a.$emit("mo.video-dialog-closed"),angular.element("body").css("overflow","auto")},a.$on("closeDialog",function(){a.closeDialog()})}}}]);