'use strict';

var services = services || angular.module('c24.PizzaDiAngeloApp.services', []);

services.factory('BasketService', ['$http', '$q', '$timeout', 'PriceCalculatorService', function ($http, $q, $timeout, priceCalculator) {
  this.basket = { items: [], address: undefined, price: 0 };

  var clear = function () {
    this.basket = { items: [], address: undefined, price: 0 };
  };

  var addItem = function (pizza, count, ingredients) {
    var price = priceCalculator.calculate(pizza, count, ingredients);

    if (ingredients !== undefined) {
      pizza = { pizza: pizza, igredients: ingredients };
    }

    var basketItem = { pizza: pizza, count: count, price: price };
    this.basket.items.push(basketItem);

    this.basket.price = priceCalculator.calculateTotalPrice(this.basket.items);
    return basketItem;
  };

  var addAddress = function (name, street, zipcode, city, phone) {
    this.basket.address = { name: name, street: street, zipcode: zipcode, city: city, phone: phone};
  };

  var removeItem = function (basketItem) {
    var index = this.basket.items.indexOf(basketItem);
    if (index >= 0) {
      this.basket.items.splice(index, 1);
      this.basket.price = priceCalculator.calculateTotalPrice(this.basket.items);
    }
  };

  var order = function () {
    var deferred = $q.defer();
    var that = this;

    $timeout(function () {
      that.clear();
      deferred.resolve();
    });

    return deferred.promise;
  };

  return {
    basket: this.basket,
    addAddress: addAddress,
    addItem: addItem,
    clear: clear,
    removeItem: removeItem,
    order: order
  };
}]);
