define(['angular', 'angular-route', 'angular-resource'], function (angular) {
  'use strict';

  var controllers = angular.module('c24.PizzaDiAngeloApp.controllers', []),
    services = angular.module('c24.PizzaDiAngeloApp.services', []);

  var app = angular.module('c24.PizzaDiAngeloApp', [
      'ngRoute',
      'c24.PizzaDiAngeloApp.controllers',
      'c24.PizzaDiAngeloApp.services'
    ]);

  app.config(function ($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
    app.lazy = {
      controller: $controllerProvider.register,
      directive: $compileProvider.directive,
      filter: $filterProvider.register,
      factory: $provide.factory,
      service: $provide.service
    };

    $routeProvider
      .when('/', {
        templateUrl: 'views/chooseyourstyle.html',
        controller: 'ChooseYourStyleCtrl',
        resolve: {
          load: ['$q', '$rootScope', function ($q, $rootScope) {
            var deferred = $q.defer();

            require(['./controllers/chooseyourstyle'], function () {
              $rootScope.$apply(function () {
                deferred.resolve();
              });
            });

            return deferred.promise;
          }]
        }
      })
      .when('/alacarte', {
        templateUrl: 'views/alacarte.html',
        controller: 'ALaCarteCtrl',
        resolve: {
          load: ['$q', '$rootScope', function ($q, $rootScope) {
            var deferred = $q.defer();

            require(['./controllers/alacarteCtrl', './controllers/basketCtrl'], function () {
              $rootScope.$apply(function () {
                deferred.resolve();
              });
            });

            return deferred.promise;
          }]
        }
      })
      .when('/checkout', {
        templateUrl: 'views/checkout.html',
        controller: 'CheckoutCtrl',
        resolve: {
          load: ['$q', '$rootScope', function ($q, $rootScope) {
            var deferred = $q.defer();

            require(['./controllers/checkoutCtrl', './controllers/basketCtrl'], function () {
              $rootScope.$apply(function () {
                deferred.resolve();
              });
            });

            return deferred.promise;
          }]
        }
      })
      .when('/thankyou', {
        templateUrl: 'views/thankYou.html',
        controller: 'ThankYouCtrl',
        resolve: {
          load: ['$q', '$rootScope', function ($q, $rootScope) {
            var deferred = $q.defer();

            require(['./controllers/thankYouCtrl'], function () {
              $rootScope.$apply(function () {
                deferred.resolve();
              });
            });

            return deferred.promise;
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  return app;
});
