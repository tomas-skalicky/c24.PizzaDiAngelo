var controllers = angular.module('c24.PizzaDiAngeloApp.controllers', []);

(function () {
  'use strict';

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
      .when('/thankyou', {
        templateUrl: 'views/thankYou.html',
        controller: 'ThankYouCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }]);
})();




