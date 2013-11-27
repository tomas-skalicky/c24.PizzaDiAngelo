'use strict';

angular.module('c24.PizzaDiAngeloApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/chooseyourstyle.html',
        controller: 'ChooseYourStyleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
