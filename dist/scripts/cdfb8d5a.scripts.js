var Utils={isLocal:document.location.host.search("localhost")>-1||document.location.host.search("lvh.me")>-1,isBchmn:document.location.host.search("bchmn.com")>-1,isHeroku:document.location.host.search("herokuapp.com")>-1,findIdInArray:function(a,b,c){"undefined"==typeof c&&(c="_id");for(var d,e=0;d=a[e];e++)if(d[c]==b)return d;return!1}},Consts={api_root:Utils.isLocal?"http://localhost:3000/":"http://tfl.bchmn.com/",client_root:Utils.isLocal?"http://localhost:9000/":"http://treatsforlife.org/",fb_app_id:Utils.isLocal?"262700727225341":"601219569953172"};String.prototype.toMMSS=function(){var a=parseInt(this,10),b=Math.floor(a/60),c=a-60*b;10>b&&(b="0"+b),10>c&&(c="0"+c);var d=b+":"+c;return d},angular.module("clientApp",["ngCookies","ngResource","ngSanitize","ngTouch","ngRoute","ngAnimate","timer","seo"]).config(["$routeProvider","$compileProvider",function(a,b){b.aHrefSanitizationWhitelist(/^\s*(https?|http?|ftp|mailto|file|tel):/),a.when("/welcome",{templateUrl:"views/welcome.html",controller:"WelcomeCtrl"}).when("/pet",{templateUrl:"views/pet.html",controller:"PetCtrl"}).when("/pet/:id",{templateUrl:"views/pet.html",controller:"PetCtrl"}).when("/shop/:id",{templateUrl:"views/shop.html",controller:"ShopCtrl"}).when("/pets",{templateUrl:"views/pets.html",controller:"PetsCtrl"}).when("/pets/:filter",{templateUrl:"views/pets.html",controller:"PetsCtrl"}).when("/",{templateUrl:"views/pets.html",controller:"PetsCtrl"}).otherwise({redirectTo:"/"})}]).run(["$location","$cookies",function(a,b){a.path().length<=1&&(console.log("$cookies",b.fb_user),a.path(b.fb_id&&"w"!=a.search().s?b.user_pet_id?"/pet":"/pets/lonely":"/welcome"))}]),angular.module("clientApp").controller("RootCtrl",["$scope","$rootScope","$timeout","$cookies","$location","Donations","Users",function(a,b,c,d,e,f,g){console.log("APP VERSION: 1.0"),a.isWeb=angular.element(window).width()>700,b.fb_id=d.fb_id,b.user_id=d.user_id,b.user_pet_id=d.user_pet_id,!b.user&&b.user_id?c(function(){g.query({id:b.user_id},function(a){b.user=a,!d.user_pet_id&&b.user&&b.user.pet&&b.user.pet._id&&(d.user_pet_id=b.user.pet._id)})}):b.user_id||(localStorage.setItem("returnUrl",e.path()),e.path("/welcome")),b.trustSrc=function(a){return $sce.trustAsResourceUrl(a)},b.goBack=function(){c(function(){a.goingBack=!0},0),c(function(){a.goingBack=!1},1e3),window.history.back()},b.openPushMenu=function(){angular.element("body").addClass("pushed"),angular.element("#menuRight").addClass("cbp-spmenu-open")},b.closePushMenu=function(){angular.element("body").removeClass("pushed"),angular.element("#menuRight").removeClass("cbp-spmenu-open")},c(function(){a.canAnimate=!0,b.windowHeight=$(window).height(),b.containerWidth=$(".container").width(),b.picHeight=.6*$(".container").width(),window.scrollTo(0,1)},5)}]),angular.module("clientApp").factory("Instagram",["$http",function(a){var b="https://api.instagram.com/v1",c="d9c1142d0ac14d1ea5a45bc8478006a4",d="treatsforlife";return{get:function(e){var f="/tags/"+d+"/media/recent",g=b+f,h={params:{client_id:c,count:e,callback:"JSON_CALLBACK"}},i=a.jsonp(g,h);return console.log(i),i}}}]),angular.module("clientApp").factory("Pets",["$resource",function(a){return a(Consts.api_root+"pet/:id",{},{all:{method:"GET",withCredentials:!0,params:{},isArray:!0},lonely:{method:"GET",withCredentials:!0,params:{id:"lonely"},isArray:!0},adopted:{method:"GET",withCredentials:!0,params:{id:"adopted"},isArray:!0},addOwner:{method:"PUT",withCredentials:!0,params:{id:"@_id"},isArray:!1},one:{method:"GET",withCredentials:!0,params:{},isArray:!1},query:{method:"GET",withCredentials:!0,params:{},isArray:!0},create:{method:"POST"},update:{method:"PUT",withCredentials:!0,params:{id:"@_id"}},remove:{method:"DELETE",params:{id:"@_id"}}})}]),angular.module("clientApp").controller("PetCtrl",["$scope","Pets","Donations","Treats","Users","$rootScope","$routeParams","$timeout","$interval","$sce","$location",function(a,b,c,d,e,f,g,h,i,j,k){function l(b){"undefined"==typeof b&&(b=5),h(function(){var c=100;a.grassHeight=a.windowHeight-(a.picHeight+62)-30-(a.showCart?50:0),a.buttonHeight=a.buttonWidth=Math.min(.9*(a.grassHeight-20),150),a.buttonMargin=(a.grassHeight-a.buttonHeight)/2,a.buttonHeight<c&&(a.buttonHeight=a.buttonWidth=c,a.buttonMargin=20,a.grassHeight=c+2*a.buttonMargin,a.picHeight=a.windowHeight-(a.grassHeight+62)-30-(a.showCart?50:0)),b>0&&h(function(){l(b-1)},1e3)})}f.bodyClass="pet",a.grassHeight=0,a.buttonAnimationReady=!1,a.buttonClicked=!1,a.picHeight=.6*$(".container").width(),a.cartIsUp=!1;var m=g.id||f.user_pet_id;!m&&f.user&&f.user.pet&&f.user.pet._id&&(m=f.user.pet._id);h(function(){!window.localStorage["pet-dialog-shown"]}),a.share=function(){var b=Consts.client_root+"/#/pet/"+m;FB.ui({method:"feed",app_id:Consts.fb_app_id,display:a.isWeb?"popup":"touch",link:b,picture:a.pet.media.image,name:"תכירו את "+a.pet.name,caption:"תמיד רצית לאמץ כלב ולא יכולת? זאת ההזדמנות שלך להציל חיים, או לפחות לעשות אותם קצת יותר טובים. קנו ל"+a.pet.name+" חטיף, צעצוע ושאר מתנות ועשו לו קצת כיף. מבטיחים לשלוח סרטון של הרגע הגדול :)",description:" ",actions:[{name:"תנו לי חטיף",link:b}]},function(){})},b.one({id:m},function(d){a.pet=d,f.navbarTitle=d.name,a.donations=[],a.donations[0]=d,a.showBuyButton=!(!d.user||d.user._id!=a.user_id)||!d.user&&!a.user.pet,a.showShareButton=!(d.user||!a.user.pet),a.showLoveButton=!(!d.user||d.user._id==a.user_id),c.given({pet_id:m},function(d){h(function(){for(var b,c=0;b=d[c];c++)a.donations.push(b)}),h(function(){window.videosSwipe=new Swipe(document.getElementById("slider"),{startSlide:0,continuous:!0,disableScroll:!0,stopPropagation:!1,callback:function(){},transitionEnd:function(){}})},50),h(function(){a.getPendingItems=function(){c.pending({pet_id:m},function(b){h(function(){a.pending=b,a.showCart=b.length>0,a.cartTitle=b.length+" "+(b.length>0?"פריטים":"פריט"),l()})})};var d=k.search();d.item_number?c.approve({item_number:d.item_number},function(c){c.approved&&(b.addOwner({user:a.user.id}),e.addPet({pet:a.pet.id})),a.getPendingItems(),k.search({})}):a.getPendingItems()},80)})}),a.playVideo=function(b){a.show_player=!0,a.player_src=j.trustAsResourceUrl(b)},a.animateButton=function(){if(a.showBuyButton)var b=1700,c=48,d=c,e=a.buttonHeight,f=0,g=i(function(){return 0==d?(i.cancel(g),void k.path("/shop/"+m)):(angular.element(".pet-buy-button").css("background-position-x",-1*f),d--,void(f+=e))},b/c)},a.flip=function(){angular.element(".flipper").toggleClass("flip")},a.nextFriday=moment().hour(0).minute(0).second(0).add("days",1).weekday(5).add("hours",12).format(),window.debug=a}]),angular.module("clientApp").controller("PetsCtrl",["$scope","$rootScope","$timeout","$routeParams","Pets",function(a,b,c,d,e){b.bodyClass="pets",a.picHeight=.6*$(".container").width();var f=d.filter;"adopted"==f?(b.navbarTitle="כלבים מאומצים",a.pets=e.adopted()):(b.navbarTitle="כלבים בודדים",a.pets=e.lonely()),c(function(){!window.localStorage["pets-dialog-shown"]}),window.debug=a}]),angular.module("clientApp").controller("WelcomeCtrl",["$scope","$rootScope","$cookies","$timeout","$location","Users",function(a,b,c,d,e,f){function g(a){if("undefined"!=typeof a&&a){c.user_id=a._id,b.user=a,a.pet&&(c.user_pet_id=a.pet?a.pet._id:"");var f=localStorage.getItem("returnUrl");d(function(){f?(e.path(f),localStorage.setItem("returnUrl","")):e.path("/")},500)}}b.bodyClass="welcome",a.placeLogo=function(c){"undefined"==typeof c&&(c=5),d(function(){angular.element(".welcome-app-explained").length>0&&(b.windowHeight=angular.element(window).height(),a.logoSpace=b.windowHeight-angular.element(".bottom-wrapper").height(),a.logoHeight=(a.logoSpace-196)/2,a.logoMargin=(a.logoSpace-196)/2+"px auto"),c>0&&d(function(){a.placeLogo(c-1)},1e3)})},a.fbLogin=function(){"undefined"!=typeof FB&&FB&&FB.login(function(a){a.authResponse?(c.fb_id=a.authResponse.userID,FB.api("/me",function(a){f.create({name:a.name,email:a.email,image:"https://graph.facebook.com/"+a.username+"/picture"},function(a){g(a)})})):console.log("User cancelled login or did not fully authorize.")})},d(function(){"undefined"!=typeof FB&&FB&&FB.getLoginStatus(function(a){if("connected"===a.status){c.fb_id=a.authResponse.userID;var d=b.user;d?g(d):f.all({fb_id:a.authResponse.userID},function(a){d=a[0],g(d)})}else"not_authorized"===a.status})},500),window.debug=a}]),angular.module("clientApp").directive("draggable",["$document",function(a){return{restrict:"A",link:function(b,c){function d(a){k=a.pageY-g+i,j=a.pageX-f+h,c.css({top:k+"px",left:j+"px"})}function e(){a.unbind("mousemove",d),a.unbind("mouseup",e)}var f=0,g=0,h=0,i=0,j=0,k=0;c.on("mousedown",function(b){b.preventDefault(),f=b.pageX,g=b.pageY,h=c.offset().left,i=c.offset().top,a.on("mousemove",d),a.on("mouseup",e)})}}}]),angular.module("clientApp").directive("tipDialog",["$timeout",function(a){return{template:'<div class="tip-dialog-container" ng-show="shown"><div class="tip-dialog-wrapper"><div class="tip-dialog animated bounce{{!leaving ? \'InDown\' : \'OutUp\'}}"><div class="rtl" ng-include="contentUrl"></div></div><div class="tip-dialog-point animated bounce{{!leaving ? \'InDown\' : \'OutUp\'}}"></div><div class="tip-dialog-dog animated bounce{{!leaving ? \'InUp\' : \'OutDown\'}}" ng-style="{backgroundImage: \'url(images/logo.png)\'}"></div><div class="tip-dialog-x animated fade{{!leaving ? \'In\' : \'Out\'}}" ng-click="closeTipDialog()"> סגור <i class="fa fa-times"></i></div></div></div>',restrict:"E",link:function(b){b.showTipDialog=function(c){a(function(){b.contentUrl="views/partials/"+c+"-dialog.html",b.shown=!0})},b.closeTipDialog=function(){b.leaving=!0,a(function(){b.shown=!1,b.leaving=!1},1e3)}}}}]),angular.module("clientApp").factory("Users",["$resource",function(a){return a(Consts.api_root+"user/:id",{},{all:{method:"GET",params:{},isArray:!0},query:{method:"GET",withCredentials:!0,params:{},isArray:!1},create:{method:"POST",withCredentials:!0},addPet:{method:"PUT",withCredentials:!0,params:{id:"@_id"},isArray:!1},update:{method:"PUT",withCredentials:!0,params:{id:"@_id"}},remove:{method:"DELETE",withCredentials:!0,params:{id:"@_id"}}})}]),angular.module("clientApp").factory("Donations",["$resource",function(a){return a(Consts.api_root+"donation/:id",{},{all:{method:"GET",withCredentials:!0,params:{},isArray:!0},query:{method:"GET",withCredentials:!0,params:{},isArray:!1},given:{method:"GET",withCredentials:!0,params:{id:"given"},isArray:!0},pending:{method:"GET",withCredentials:!0,params:{id:"pending"},isArray:!0},create:{method:"POST"},approve:{method:"POST",params:{id:"approve"}},update:{method:"PUT",withCredentials:!0,params:{id:"@_id"}},remove:{method:"DELETE",params:{id:"@_id"}}})}]),angular.module("clientApp").controller("ShopCtrl",["$scope","$rootScope","$routeParams","$timeout","$location","Treats","Pets","Donations",function(a,b,c,d,e,f,g,h){var i=c.id||b.user_pet_id;b.bodyClass="shop",b.navbarTitle="החנות",a.returnUrl=Consts.client_root+"#/pet/"+i,a.notifyUrl=Consts.api_root+"donation",a.treats=f.all();var j=[];d(function(){!window.localStorage["shop-dialog-shown"]}),a.pet||(a.pet=g.one({id:i})),d(function(){a.showCheckout=!0},500),a.initCheckout=function(){d(function(){angular.element(".shop-checkout").addClass("animated fadeInUp"),a.cartChanged()},500)},a.calcTotalToPay=function(){var b=0;j=[];for(var c,d=0;c=a.treats[d];d++)(c.cart||c.fixed)&&(b+=c.price,j.push(c));return b},a.formatItemName=function(){for(var b,c=" עבור "+a.pet.name,d=[],e=0;b=a.treats[e];e++)(b.cart||b.fixed)&&d.push(b.name);if(d.length>1){var f=d[0],g=d.slice(1);c=g.join(", ")+" ו"+f+c}else c=d[0]+c;return c},a.totalToPay=0,a.cartChanged=function(){a.totalToPay=a.calcTotalToPay(),a.formattedItemName=a.formatItemName(),a.ItemNumber=(new Date).getTime(),a.paymentActive=a.totalToPay>0},a.pay=function(c){if(a.cartChanged(),a.paymentActive){a.paymentActive=!1;for(var d,e=0,f=0;d=j[f];f++)h.create({paypalItem:a.ItemNumber,treat:d._id,user:b.user_id,pet:a.pet._id,payed:!1},function(){e++,e>=j.length&&(c?document.location.href=a.returnUrl+"?fake=1&item_number="+a.ItemNumber:angular.element("#payment-form").submit())})}}}]),angular.module("clientApp").factory("Treats",["$resource",function(a){return a(Consts.api_root+"treat/:id",{},{all:{method:"GET",withCredentials:!0,params:{},isArray:!0},query:{method:"GET",withCredentials:!0,params:{},isArray:!1},create:{method:"POST"},update:{method:"PUT",withCredentials:!0,params:{id:"@_id"}},remove:{method:"DELETE",params:{id:"@_id"}}})}]),angular.module("clientApp").directive("player",["$location","$timeout",function(a,b){return{restrict:"AE",scope:{show:"=",videoSrc:"=",isEditMode:"="},template:'<div id="dialog-video" class="dialog-video" ng-show="show" bindonce bo-class="{preview: !isMobile}"><video id="video-player" ng-src="{{videoSrc}}" ng-click="toggleVideo()"></video><div id="video-loading-indicator" ng-if="isVideoBuffering">Loading<i class="fa fa-spinner fa-spin"></i></div><div id="video-controls-wrapper"><div class="video-controls"><div class="video-controls-section playback"><i ng-hide="isPlaying" ng-click="playVideo()" class="fa fa-play fa-fw"></i><i ng-show="isPlaying" ng-click="pauseVideo()" class="fa fa-pause fa-fw"></i></div><div class="video-controls-section progress-wrapper"><div id="progressbar" class="video-progress-total" ng-click="seekVideo($event)"><div id="progress-current" class="video-progress-current" ng-style="{width: currentPosition}"></div></div></div><span class="video-position-indicator" ng-bind="currentTime"></span></div></div><button class="dialog-video-close" ng-click="closeDialog()"><i class="fa fa-fw fa-times"></i></button></div>',link:function(a){a.isVideoLoaded=a.isPlaying=a.isMuted=!1,a.isVideoBuffering=!0,a.currentTime="0:00",a.currentPosition=0;var c,d,e,f,g,h=!1;a.$watch("show",function(a,b){a!==!0||!angular.isUndefined(b)&&b!==!1||j()});var i=!1,j=function(){return i?(a.currentTime="0:00",a.currentPosition=0,void(a.$root.isMobile||(k(),c.volume=1))):(i=!0,c=document.getElementById("video-player"),a.$root.isMobile||(k(),c.volume=1),c.addEventListener("canplaythrough",l),c.addEventListener("playing",m),c.addEventListener("timeupdate",n),c.addEventListener("pause",o),c.addEventListener("seeking",function(){b(function(){a.isVideoBuffering=!0})}),c.addEventListener("seeked",function(){b(function(){a.isVideoBuffering=!1})}),a.currentTime="0:00",a.currentPosition=0,d=document.getElementById("progressbar"),f=d.clientWidth,void(g=d.offsetLeft))},k=function(){h=!0};a.$on("mo.orientationchange",function(){f=d.clientWidth,g=d.offsetLeft});var l=function(){console.log("Video can play event"),b(function(){a.isVideoLoaded=!0,a.isVideoBuffering=!1}),console.log("Video play"),c.play(),e=!0},m=function(){console.log("Video playing event"),b(function(){a.isPlaying=!0})},n=function(){b(function(){a.currentPosition=c.currentTime*f/c.duration,a.currentTime=c.currentTime.toString().toMMSS()})},o=function(){console.log("Video paused event"),a.$apply(function(){b(function(){a.isPlaying=!1})})};a.toggleVideo=function(){e?a.pauseVideo():a.playVideo()},a.playVideo=function(){angular.isDefined(c)&&(console.log("play video action",c),c.ended&&(a.currentTime="0:00",a.currentPosition=0),c.play(),e=!0)},a.pauseVideo=function(){console.log("pause video action"),angular.isDefined(c)&&(c.pause(),e=!1)},a.seekVideo=function(b){console.log("seek video action"),angular.isDefined(c)&&a.isPlaying&&(c.currentTime=(b.clientX-g)*c.duration/f)},a.closeDialog=function(){a.pauseVideo(),b(function(){a.show=a.isVideoLoaded=a.isPlaying=a.isMuted=!1,a.isVideoLoaded=!0,a.currentTime="0:00",a.currentPosition=0}),a.$emit("mo.video-dialog-closed"),angular.element("body").css("overflow","auto")},a.$on("closeDialog",function(){a.closeDialog()})}}}]);