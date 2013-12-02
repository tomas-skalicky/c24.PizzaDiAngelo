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
  })
  .config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];;
  }]);
