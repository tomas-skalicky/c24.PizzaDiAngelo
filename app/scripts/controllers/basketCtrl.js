(function(controllers) {
  'use strict';

  controllers.controller('BasketCtrl', function ($scope, BasketService) {
    $scope.basket = BasketService.basket;
  });

})(controllers);
