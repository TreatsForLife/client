'use strict';

angular.module('clientApp')
  .directive('tipDialog', function () {
    return {
      templateUrl: 'partials/tipDialog.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.text = ('this is the tipDialog directive');

          scope.showTipDialog = function(){
              scope.shown = true;
          }
      }
    };
  });
