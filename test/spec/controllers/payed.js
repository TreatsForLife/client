'use strict';

describe('Controller: PayedCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var PayedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PayedCtrl = $controller('PayedCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
