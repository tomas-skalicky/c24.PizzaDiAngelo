(function(controllers) {
  'use strict';

  controllers.controller('GoCrazyToppingsCtrl', function ($scope, $location, InventoryService, BasketService) {
    if(BasketService.basket.items.length === 0) {
      $location.path('/gocrazy/layers');
      return;
    }

    $scope.selectedBasketItem = BasketService.basket.items[0];

    $scope.ingredients = InventoryService.fetchIngredients();

    $scope.addIngredientToPizza = function(ingredient) {
      var indexOfIngredient = $scope.selectedBasketItem.ingredients.indexOf(ingredient);

      if(ingredient.isSelected && indexOfIngredient === -1) {
        $scope.selectedBasketItem.ingredients.push(ingredient);
      } else if(!ingredient.isSelected && indexOfIngredient > -1) {
        $scope.selectedBasketItem.ingredients.splice($scope.selectedBasketItem.ingredients.indexOf(ingredient), 1);
      }
    }

    $scope.checkout = function () {
      $location.path('/checkout');
    };
  });

})(controllers);
