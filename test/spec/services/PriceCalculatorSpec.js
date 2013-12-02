'use strict';

describe('PriceCalculatorSpec', function () {
  var priceCalculator;

  beforeEach(function () {
    module('c24.PizzaDiAngeloApp');
    module('c24.PizzaDiAngeloApp.services');
  });

  beforeEach(inject(function ($injector) {
    priceCalculator = $injector.get('PriceCalculatorService');
  }));

  it('Should calculate the price for a normal pizza with their price and the ordered count', function () {
    var price = priceCalculator.calculate({ price: 5.5 }, 2);
    expect(price).toEqual(11);
  });

  it('Should calculate the price for a custom pizza with their price and the ordered count', function () {
    var price = priceCalculator.calculate({ price: 2 }, 2, [{price: 1}, {price: 2}, {price: 3}]);
    expect(price).toEqual(16);
  });

  it('Should calculate the total price for all items that are in the basket', function () {
    var price = priceCalculator.calculateTotalPrice([{price: 1}, {price: 2}, {price: 3}]);
    expect(price).toEqual(6);
  });



});


