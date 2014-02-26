(function() {
  'use strict';

  describe('Controller: ThankYouCtrl', function(){
    var $controllerService,
      $scope,
      $locationService,
      controller,
      basketService;

      beforeEach(function () {
        module('c24.PizzaDiAngeloApp');
        module('c24.PizzaDiAngeloApp.controllers');
        module('c24.PizzaDiAngeloApp.services');
      });

      beforeEach(inject(function($injector, $controller, $rootScope,BasketService){
        basketService = BasketService;
        $controllerService = $controller;
        $scope = $rootScope.$new();
      }));

      describe('When the basket contains a la carte items.', function() {
        var aLaCartePizza = {
          id: 1,
          name: 'Vegetarian Pizza',
          price: 6.5
        };

        beforeEach(function () {
          basketService.addItem(aLaCartePizza, 2);
        });

        describe('When the controller is created', function () {
          beforeEach(function () {
            controller = $controllerService('ThankYouCtrl', {
              $scope: $scope,
              BasketService: basketService
            });
          });

          it('Should have an empty basket', function () {
            expect(basketService.basket.items.length).toBe(0);
          });
        });
      });

      describe('When the basket contains crazy items.', function() {
        var goCrazyPizza = {
          id: 1,
          name: 'Thin Crust',
          price: 2
        };

        beforeEach(function () {
          basketService.addBaseItem(goCrazyPizza, 2);
        });

        describe('When the controller is created', function () {
          beforeEach(function () {
            controller = $controllerService('ThankYouCtrl', {
              $scope: $scope,
              BasketService: basketService
            });
          });

          it('Should have an empty basket', function () {
            expect(basketService.basket.items.length).toBe(0);
          });
        });
      });

  });

})();
