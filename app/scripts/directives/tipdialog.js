'use strict';

angular.module('clientApp')
    .directive('tipDialog', function ($timeout) {
        return {
            template: '<div class="tip-dialog-container" ng-show="shown">' +
                '<div class="tip-dialog-wrapper">' +
                '<div class="tip-dialog animated bounce{{!leaving ? \'InDown\' : \'OutUp\'}}"><div class="rtl" ng-include="content"></div></div>' +
                '<div class="tip-dialog-point animated bounce{{!leaving ? \'InDown\' : \'OutUp\'}}"></div>' +
                '<div class="tip-dialog-dog animated bounce{{!leaving ? \'In\' : \'Out\'}}" ng-style="{backgroundImage: \'url(images/logo.png)\'}"></div>' +
                '<div class="tip-dialog-x animated fade{{!leaving ? \'In\' : \'Out\'}}" ng-click="closeTipDialog()"><i class="fa fa-times-circle-o"></i>' +
                '</div>' +
                '</div>' +
                '</div>',
            restrict: 'E',
            link: function (scope, element, attrs) {


                scope.showTipDialog = function (contentUrl) {
                    $timeout(function () {
                        scope.content = 'partials/dialogs/' + contentUrl + '.html';
                        scope.shown = true;
                    });
                }
                scope.closeTipDialog = function () {
                    scope.leaving = true;
                    $timeout(function () {
                        scope.shown = false;
                        scope.leaving = false;
                    }, 1000);
                }
            }
        };
    });
