(function(controllers) {
  'use strict';

  controllers.controller('ChooseYourStyleCtrl', function ($scope, $location, BasketService) {
    $scope.styles = ['A la Carte', 'Go Crazy'];
    $scope.selectedstyle = '';

    BasketService.clear();

    $scope.navigate = function () {
      if($scope.selectedstyle === $scope.styles[0]) {
        $location.path('alacarte');
      } else {
        $location.path('gocrazy/layers');
      }
    };
  });

})(controllers);
