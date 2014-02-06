define(['angular', './../services/basketService'], function (angular) {
  'use strict';

  angular.module('c24.PizzaDiAngeloApp').lazy.controller('CheckoutCtrl', function ($scope, $location, BasketService) {
    $scope.address = BasketService.basket.address;

    $scope.finishOrder = function() {
      $location.path('thankyou');
    };
  });
});
