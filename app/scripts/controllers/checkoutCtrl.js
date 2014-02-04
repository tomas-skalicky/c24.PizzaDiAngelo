(function(controllers) {
  'use strict';

  controllers.controller('CheckoutCtrl', function ($scope, $location, BasketService) {
    $scope.address = BasketService.basket.address;

    $scope.finishOrder = function() {
      $location.path('thankyou');
    };
  });

})(controllers);
