'use strict';

describe('Service: Donations', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var Donations;
  beforeEach(inject(function (_Donations_) {
    Donations = _Donations_;
  }));

  it('should do something', function () {
    expect(!!Donations).toBe(true);
  });

});
