'use strict';

var services = services || angular.module('c24.PizzaDiAngeloApp.services', []);

services.factory('BasketService', ['$http', '$q', '$timeout', 'PriceCalculatorService', function ($http, $q, $timeout, priceCalculator) {
  var baseItems = [],
    getNewAddress = function (name, street, zipcode, city, phone) {
    return {
      name: name || '',
      street: street || '',
      zipcode: zipcode || '',
      city: city || '',
      phone: phone || ''
    };
  };

  var addAddress = function (name, street, zipcode, city, phone) {
    this.basket.address = getNewAddress(name, street, zipcode, city, phone);
  };

  var getItemsByPizzaId = function (pizzaId) {
    var index, basketItems = [];
    for(index = 0; index < this.basket.items.length; index++) {
      if(this.basket.items[index].pizza.id === pizzaId) {
        basketItems.push(this.basket.items[index]);
      }
    }
    return basketItems;
  };

  var getTotalPizzaCountByPizzaId = function(pizzaId) {
    var basketItems = this.getItemsByPizzaId(pizzaId),
      pizzasCount = basketItems.reduce(function(previous, current) {
        return previous + current.count;
      }, 0);
    return pizzasCount;
  };

  var addItem = function (pizza, count) {
    var basketItem = findBasketItemByPizza(this.basket.items, pizza),
      price = priceCalculator.calculate(pizza, count);

    if(basketItem) {
      updateBasketItem(basketItem, count, price);
    } else {
      basketItem = createAndAddBasketItem.call(this, this.basket.items, pizza, count, price);
    }

    this.basket.price = priceCalculator.calculateTotalPrice(this.basket.items);
    return basketItem;
  };

  var addBaseItem = function (pizza, count, ingredients) {
    var basketItem = findBasketItemByPizza(this.basket.items, pizza),
      price = priceCalculator.calculate(pizza, count, ingredients);

    if(basketItem) {
      updateBasketItem(basketItem, count, price);
    } else {
      basketItem = createAndAddBasketItem.call(this, this.basket.items, pizza, count, price, ingredients || []);
      baseItems.push(basketItem);
    }
    this.basket.price = priceCalculator.calculateTotalPrice(this.basket.items);

    return basketItem;
  }

  var clear = function () {
    baseItems = [];
    this.basket = {
      items: [],
      address: getNewAddress(),
      price: 0
    };
  };

  var createAndAddBasketItem = function (basketItems, pizza, count, price, ingredients) {
    var that = this,
      basketItem = {
        pizza: pizza,
        count: count,
        price: price,
        ingredients: ingredients,
        isBasePizza: angular.isArray(ingredients),
        addIngredient: function (ingredient) {
          this.ingredients.push(ingredient);
          this.price = priceCalculator.calculate(this.pizza, this.count, this.ingredients);
          that.basket.price = priceCalculator.calculateTotalPrice(that.basket.items);
        },
        removeIngredient: function (ingredient) {
          this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
          this.price = priceCalculator.calculate(this.pizza, this.count, this.ingredients);
          that.basket.price = priceCalculator.calculateTotalPrice(that.basket.items);
        }
      };

    basketItems.push(basketItem);
    return basketItem;
  };

  var findBasketItemByPizza = function (basketItems, pizza) {
    var filteredItems = basketItems.filter(function (item) {
      return item.pizza.id === pizza.id;
    });
    return filteredItems.length > 0 ? filteredItems[0] : null;
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

  var removeItem = function (basketItem, count) {
    var index = this.basket.items.indexOf(basketItem);
    if (index >= 0) {
      if(count && count < basketItem.count) {
        basketItem.count -= count;
        basketItem.price = basketItem.pizza.price * basketItem.count;
      } else {
        baseItems.splice(baseItems.indexOf(basketItem));
        this.basket.items.splice(index, 1);
        basketItem.count = 0;
        basketItem.price = 0;
      }
      this.basket.price = priceCalculator.calculateTotalPrice(this.basket.items);
    }
  };

  var updateBasketItem = function (basketItem, count, price) {
    basketItem.count += count;
    basketItem.price += price;
  };

  var getBaseBasketItems = function () {
    return baseItems;
  };

  clear.call(this);

  return {
    basket: this.basket,
    getItemsByPizzaId: getItemsByPizzaId,
    getTotalPizzaCountByPizzaId: getTotalPizzaCountByPizzaId,
    addAddress: addAddress,
    addItem: addItem,
    addBaseItem: addBaseItem,
    clear: clear,
    removeItem: removeItem,
    getBaseBasketItems: getBaseBasketItems,
    order: order
  };
}]);
