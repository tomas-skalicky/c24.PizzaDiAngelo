(function(controllers) {
  'use strict';

  controllers.controller('GoCrazyLayersCtrl', function ($scope, $location, InventoryService, BasketService) {
    $scope.basePizzas = [];

    InventoryService.fetchBasePizzas().then(function (basePizzas) {
      $scope.basePizzas = basePizzas;
    });

    $scope.addToBasket = function(pizza) {
      var basketItem = BasketService.addBaseItem(pizza, 1);
    };

    $scope.extractFromBasket = function(pizza) {
      var basketItems = BasketService.getItemsByPizzaId(pizza.id),
        basketItem;

      if(basketItems.length > 0) {
        basketItem = basketItems[0];
        BasketService.removeItem(basketItem, 1);
      }
    };

    $scope.addItemAndNavigateToCheckout = function (pizza) {
      BasketService.clear();
      $scope.addToBasket(pizza);
      $scope.navigateToppings();
    }

    $scope.getPizzaCountFromBasket = function(pizza) {
      var basketItem = BasketService.getItemsByPizzaId(pizza.id)[0];
      if(basketItem) {
        return basketItem.count;
      }
      return 0;
    };

    $scope.navigateToppings = function () {
      $location.path('/gocrazy/toppings');
    };
  });

})(controllers);
