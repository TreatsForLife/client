'use strict';

describe('Service: Pets', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var Pets;
  beforeEach(inject(function (_Pets_) {
    Pets = _Pets_;
  }));

  it('should do something', function () {
    expect(!!Pets).toBe(true);
  });

});
