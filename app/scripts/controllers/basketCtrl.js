(function(controllers) {
  'use strict';

  controllers.controller('BasketCtrl', function ($scope, BasketService) {
    $scope.basket = BasketService.basket;

    $scope.isEditable = false;
    $scope.isSelectable = false;

    $scope.removeItemFromBasket = function (basketItem) {
      BasketService.removeItem(basketItem);
    };
  });

})(controllers);
