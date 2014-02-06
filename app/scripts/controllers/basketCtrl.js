define(['angular', './../services/basketservice'], function (angular) {
  'use strict';

  angular.module('c24.PizzaDiAngeloApp').lazy.controller('BasketCtrl', function ($scope, BasketService) {
    $scope.basket = BasketService.basket;

    $scope.isEditable = false;
    $scope.isSelectable = false;

    $scope.removeItemFromBasket = function (basketItem) {
      BasketService.removeItem(basketItem);
    };
  });
});
