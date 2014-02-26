(function(controllers) {
  'use strict';

  controllers.controller('ThankYouCtrl', function ($scope, BasketService) {
    BasketService.clear();
  });

})(controllers);
