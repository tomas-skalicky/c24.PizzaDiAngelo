'use strict';

angular.module('c24.PizzaDiAngeloApp', ['c24.PizzaDiAngeloApp.controllers'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/chooseyourstyle.html',
        controller: 'ChooseYourStyleCtrl'
      })
      .when('/alacarte', {
        templateUrl: 'views/alacarte.html',
        controller: 'ALaCarteCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
