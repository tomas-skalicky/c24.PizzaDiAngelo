(function(controllers) {
  'use strict';

  controllers.controller('GoCrazyToppingsCtrl', function ($scope, $location, InventoryService, BasketService) {
    if(BasketService.basket.items.length === 0) {
      $location.path('/gocrazy/layers');
      return;
    }

    $scope.basketBaseItems = BasketService.getBaseBasketItems();
    $scope.selectedBasketItem = $scope.basketBaseItems[0];

    InventoryService.fetchIngredients().then(function (ingredients) {
      $scope.ingredients = ingredients;
      /* While navigating, make sure the ingredients are selected correctly on load*/
      $scope.selectIngredientsForBasketItem($scope.selectedBasketItem);
    });

    $scope.selectIngredientsForBasketItem = function (basketItem) {
      $scope.ingredients.forEach(function (element, index) {
        if (basketItem.ingredients.indexOf(element) > -1) {
          element.isSelected = true;
        } else {
          element.isSelected = false;
        }
      });
    };

    $scope.changeSelectBasketItem = function () {
      $scope.selectIngredientsForBasketItem($scope.selectedBasketItem);
    };

    $scope.addOrRemoveIngredientsOfPizza = function(ingredient, isSelectedIngredient) {
      var indexOfIngredient = $scope.selectedBasketItem.ingredients.indexOf(ingredient);

      if(isSelectedIngredient && indexOfIngredient === -1) {
        $scope.selectedBasketItem.addIngredient(ingredient);
      } else if(!isSelectedIngredient && indexOfIngredient > -1) {
        $scope.selectedBasketItem.removeIngredient(ingredient);
      }
    };

    $scope.checkout = function () {
      $location.path('/checkout');
    };
  });

})(controllers);
