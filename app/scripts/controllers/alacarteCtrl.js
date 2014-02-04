(function(controllers) {
  'use strict';

  controllers.controller('ALaCarteCtrl', function ($scope, $location, InventoryService, BasketService) {
    $scope.pizzas = InventoryService.fetchBasePizzas();

    $scope.addToBasket = function(pizza) {
      BasketService.addItem(pizza, 1);
      pizza.inBasketCount = BasketService.getTotalPizzaCountByPizzaId(pizza.id);
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

    $scope.checkout = function () {
      $location.path('checkout');
    };
  });

})(controllers);
