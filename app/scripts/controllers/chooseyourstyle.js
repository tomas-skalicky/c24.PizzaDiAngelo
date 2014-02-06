define(['angular'], function (angular) {
  'use strict';

  angular.module('c24.PizzaDiAngeloApp').lazy.controller('ChooseYourStyleCtrl', function ($scope, $location) {
    $scope.styles = ['A la Carte', 'Go Crazy'];
    $scope.selectedstyle = '';

    $scope.navigate = function () {
      if($scope.selectedstyle === $scope.styles[0]) {
        $location.path('alacarte');
      } else {
        $location.path('gocrazy');
      }
    };
  });
});
