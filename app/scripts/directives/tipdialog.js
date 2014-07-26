'use strict';

angular.module('clientApp')
    .directive('tipDialog', ['$timeout', function ($timeout) {
        return {
            scope: true,
            template: '<div class="tip-dialog-container" ng-show="shown">' +
                '<div class="tip-dialog-wrapper">' +
                '<div class="tip-dialog animated bounce{{!leaving ? \'InDown\' : \'OutUp\'}}"><div class="rtl" ng-include="contentUrl"></div></div>' +
                '<div class="tip-dialog-point animated bounce{{!leaving ? \'InDown\' : \'OutUp\'}}"></div>' +
                '<div class="tip-dialog-dog animated bounce{{!leaving ? \'InUp\' : \'OutDown\'}}" ng-style="{backgroundImage: \'url(images/logo.png)\'}"></div>' +
                '<div class="tip-dialog-x animated fade{{!leaving ? \'In\' : \'Out\'}}" ng-click="closeTipDialog()"> סגור <i class="fa fa-times"></i>' +
                '</div>' +
                '</div>' +
                '</div>',
            restrict: 'E',
            link: function (scope, element, attrs) {
                scope.shown = false;
                scope.leaving = false;

                scope.$on('showTipDialog', function (e, filename) {
                    $timeout(function () {
                        scope.contentUrl = 'views/partials/' + filename + '-dialog.html';
                        scope.shown = true;
                        scope.$apply();
                    }, 100);
                });
                scope.closeTipDialog = function () {
                    scope.leaving = true;
                    $timeout(function () {
                        scope.shown = false;
                        scope.leaving = false;
                    }, 1000);
                }
            }
        };
    }]);
