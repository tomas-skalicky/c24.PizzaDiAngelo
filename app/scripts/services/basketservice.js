'use strict';

var services = services || angular.module('c24.PizzaDiAngeloApp.services', []);

services.factory('BasketService', ['$http', '$q', '$timeout', 'PriceCalculatorService', function ($http, $q, $timeout, priceCalculator) {
  this.basket = { items: [], address: undefined, price: 0 };

  var clear = function () {
    this.basket = { items: [], address: undefined, price: 0 };
  };

  var addItem = function (pizza, count, ingredients) {
    var basketItem;
    var price = priceCalculator.calculate(pizza, count, ingredients);

    if (ingredients !== undefined) {
      // It's a selfmade pizza
      basketItem = createAndAddBasketItem(this.basket.items, { pizza: pizza, ingredients: ingredients }, count, price);
    } else {
      // look, if there is an existing basketItem for the given pizza
      basketItem = findBasketItemByPizza(this.basket.items, pizza);
      if (basketItem !== null) {
        updateBasketItem(basketItem, count, price);
      } else {
        basketItem = createAndAddBasketItem(this.basket.items, pizza, count, price);
      }
    }
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

  var createAndAddBasketItem = function (basketItems, pizza, count, price) {
    var basketItem = { pizza: pizza, count: count, price: price };
    basketItems.push(basketItem);
    return basketItem;
  };

  var updateBasketItem = function (basketItem, count, price) {
    basketItem.count += count;
    basketItem.price += price;
  };

  var findBasketItemByPizza = function (basketItems, pizza) {
    var filteredItems = basketItems.filter(function (item) {
      return item.pizza.id === pizza.id;
    });
    return filteredItems.length > 0 ? filteredItems[0] : null;
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
