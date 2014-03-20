'use strict';

angular.module('clientApp')
  .directive('tipDialog', function ($timeout) {
    return {
      templateUrl: 'partials/tipDialog.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

          var texts = {
              buy_treat: "איזה כיף שהחלטת לקנות לי מתנה!\n" +
                  ""
          }


        scope.text = texts.buy_treat;

          scope.showTipDialog = function(){
              scope.shown = true;
          }
          scope.closeTipDialog = function(){

              scope.leaving = true;
              $timeout(function(){
                  scope.shown = false;
              },1000);
          }
      }
    };
  });
