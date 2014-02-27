var controllers = angular.module('c24.PizzaDiAngeloApp.controllers', []);
var directives = angular.module('c24.PizzaDiAngeloApp.directives', []);

(function () {
  'use strict';

  angular.module('c24.PizzaDiAngeloApp', [
    'ngRoute',
    'c24.PizzaDiAngeloApp.controllers',
    'c24.PizzaDiAngeloApp.services',
    'c24.PizzaDiAngeloApp.directives',
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
        controller: 'CheckoutCtrl',
        resolve: {
          load: ['$q', '$rootScope', '$location', 'BasketService', function ($q, $rootScope, $location, basketService) {
            var deferred = $q.defer();

            if(basketService.basket.items.length === 0) {
              deferred.reject();
              $location.path('/');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }]
        }
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




