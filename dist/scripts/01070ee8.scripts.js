"use strict";angular.module("clientApp",["ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider",function(a){a.when("/welcome",{templateUrl:"views/welcome.html",controller:"WelcomeCtrl"}).when("/",{templateUrl:"views/pet.html",controller:"PetsCtrl"}).otherwise({redirectTo:"/"})}]).run(["$location",function(){!localStorage.getItem("instagram_access_token")}]),angular.module("clientApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("clientApp").factory("Instagram",["$http",function(a){var b="https://api.instagram.com/v1",c="d9c1142d0ac14d1ea5a45bc8478006a4",d="treatsforlife";return{get:function(e){var f="/tags/"+d+"/media/recent",g=b+f,h={params:{client_id:c,count:e,callback:"JSON_CALLBACK"}},i=a.jsonp(g,h);return console.log(i),i}}}]),angular.module("clientApp").controller("PetsCtrl",["$scope","Instagram","$rootScope","$timeout",function(a,b,c,d){c.bodyClass="pets",a.grassHeight=angular.element(window).height()-angular.element(window).width(),b.get(100).success(function(b){d(function(){a.photos=b.data}),d(function(){window.videosSwipe=new Swipe(document.getElementById("slider"),{startSlide:0,continuous:!0,disableScroll:!0,stopPropagation:!1,callback:function(){},transitionEnd:function(){}}),window.treatsSwipe=new Swipe(document.getElementById("slider-treats"),{startSlide:0,continuous:!0,disableScroll:!0,stopPropagation:!1,callback:function(){},transitionEnd:function(){}})},1e3)}),a.flip=function(){angular.element(".flipper").toggleClass("flip")}}]),angular.module("clientApp").controller("WelcomeCtrl",["$scope","$rootScope",function(a,b){b.bodyClass="welcome"}]),angular.module("clientApp").controller("RootCtrl",["$scope","$rootScope",function(a){a.instajam=Instajam.init({clientId:"1e7c407bd22b435e8447b7607245a947",redirectUri:"http://127.0.0.1:9000",scope:["basic","comments"]}),a.instajam.user.self.profile(function(a){console.log(a)})}]),angular.module("clientApp").directive("draggable",["$document",function(a){return{restrict:"A",link:function(b,c){function d(a){k=a.pageY-g+i,j=a.pageX-f+h,c.css({top:k+"px",left:j+"px"})}function e(){a.unbind("mousemove",d),a.unbind("mouseup",e)}var f=0,g=0,h=0,i=0,j=0,k=0;c.on("mousedown",function(b){b.preventDefault(),f=b.pageX,g=b.pageY,h=c.offset().left,i=c.offset().top,a.on("mousemove",d),a.on("mouseup",e)})}}}]);