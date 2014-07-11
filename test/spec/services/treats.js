'use strict';

describe('Service: Treats', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var Treats;
  beforeEach(inject(function (_Treats_) {
    Treats = _Treats_;
  }));

  it('should do something', function () {
    expect(!!Treats).toBe(true);
  });

});
