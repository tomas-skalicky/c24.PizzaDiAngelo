define(['angular', './../services/inventoryservice', './../services/basketservice'], function (angular) {
  'use strict';

  angular.module('c24.PizzaDiAngeloApp').lazy.controller('ALaCarteCtrl', function ($scope, $location, InventoryService, BasketService) {

    InventoryService.fetchPizzas().then(function (pizzas) {
      $scope.pizzas = pizzas;
    });

    $scope.addToBasket = function(pizza) {
      var basketItem = BasketService.addItem(pizza, 1);
    };

    $scope.extractFromBasket = function(pizza) {
      var basketItems = BasketService.getItemsByPizzaId(pizza.id),
        basketItem;

      if(basketItems.length > 0) {
        basketItem = basketItems[0];
        BasketService.removeItem(basketItem, 1);
      }
    };

    $scope.getPizzaCountFromBasket = function(pizza) {
      var basketItem = BasketService.getItemsByPizzaId(pizza.id)[0];
      if(basketItem) {
        return basketItem.count;
      }
      return 0;
    };

    $scope.checkout = function () {
      $location.path('checkout');
    };
  });
});
