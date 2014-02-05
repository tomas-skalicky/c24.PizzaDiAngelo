(function(controllers) {
  'use strict';

  controllers.controller('GoCrazyLayersCtrl', function ($scope, $location, InventoryService, BasketService) {
    $scope.basePizzas = InventoryService.fetchBasePizzas();

    $scope.addToBasket = function(pizza) {
      var basketItem = BasketService.addBaseItem(pizza, 1);
      pizza.inBasketCount = basketItem.count;
    };

    $scope.extractFromBasket = function(pizza) {
      var basketItems = BasketService.getItemsByPizzaId(pizza.id),
        basketItem;

      if(basketItems.length > 0) {
        basketItem = basketItems[0];
        BasketService.removeItem(basketItem, 1);
        pizza.inBasketCount = basketItem.count;
      }
    };

    $scope.navigateToppings = function () {
      $location.path('/gocrazy/toppings');
    };
  });

})(controllers);
