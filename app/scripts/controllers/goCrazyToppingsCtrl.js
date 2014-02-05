(function(controllers) {
  'use strict';

  controllers.controller('GoCrazyToppingsCtrl', function ($scope, $location, InventoryService, BasketService) {
    if(BasketService.basket.items.length === 0) {
      $location.path('/gocrazy/layers');
      return;
    }

    $scope.ingredients = InventoryService.fetchIngredients();

    $scope.basketItems = BasketService.basket.items;
    $scope.selectedBasketItem = $scope.basketItems[0];

    $scope.selectIngredientsForBasketItem = function (basketItem) {
      $scope.ingredients.then(function (ingredients) {
        ingredients.forEach(function (element, index) {
          if (basketItem.ingredients.indexOf(element) > -1) {
            element.isSelected = true;
          } else {
            element.isSelected = false;
          }
        });
      });
    };

    $scope.changeSelectBasketItem = function () {
      $scope.selectIngredientsForBasketItem($scope.selectedBasketItem);
    };

    $scope.addOrRemoveIngredientsOfPizza = function(ingredient, isSelectedIngredient) {
      var indexOfIngredient = $scope.selectedBasketItem.ingredients.indexOf(ingredient);

      if(isSelectedIngredient && indexOfIngredient === -1) {
        $scope.selectedBasketItem.ingredients.push(ingredient);
      } else if(!isSelectedIngredient && indexOfIngredient > -1) {
        $scope.selectedBasketItem.ingredients.splice($scope.selectedBasketItem.ingredients.indexOf(ingredient), 1);
      }
    }

    $scope.checkout = function () {
      $location.path('/checkout');
    };
  });

})(controllers);
