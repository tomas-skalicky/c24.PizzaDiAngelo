'use strict';

var services = services || angular.module('c24.PizzaDiAngeloApp.services', []);

services.factory('PriceCalculatorService', [function () {
  var calculate = function (pizza, count, ingredients) {
    ingredients = ingredients || [];

    var price = pizza.price;
    ingredients.forEach(function (ingredient) {
      price += ingredient.price;
    });

    price = price * count;

    return price;
  };

  var calculateTotalPrice = function (items) {
    var price = 0;

    items.forEach(function (item) {
      price += item.price;
    });

    return price;
  };

  return {
    calculate: calculate,
    calculateTotalPrice: calculateTotalPrice
  };
}]);
