'use strict';
var controllers = angular.module('c24.PizzaDiAngeloApp.controllers', []);

angular.module('c24.PizzaDiAngeloApp', [
    'c24.PizzaDiAngeloApp.controllers',
    'c24.PizzaDiAngeloApp.services',
  ])
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
      .when('/gocrazy/layers', {
        templateUrl: 'views/gocrazylayers.html',
        controller: 'GoCrazyLayersCtrl'
      })
      .when('/gocrazy/toppings', {
        templateUrl: 'views/gocrazytoppings.html',
        controller: 'GoCrazyToppingsCtrl'
      })
      .when('/checkout', {
        templateUrl: 'views/checkout.html',
        controller: 'CheckoutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


