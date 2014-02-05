'use strict';

describe('Controller: BasketCtrl', function(){
  var $controllerService,
    $scope,
    controller,
    pizza1 = {
      id: 1,
      name: 'Quatro Frommagi',
      price: 10
    },
    basketService;

  beforeEach(function () {
    module('c24.PizzaDiAngeloApp');
    module('c24.PizzaDiAngeloApp.controllers');
  });

  beforeEach(inject(function($injector, $controller, $rootScope, BasketService){
  	$controllerService = $controller;
    $scope = $rootScope.$new();
    basketService = BasketService;

    controller = $controllerService('BasketCtrl', {
      $scope: $scope,
      BasketService: basketService
    });
  }));

  describe('When the user wants to delete an existing item', function () {
    var spyBasketServiceRemove, basketItem;
    beforeEach(function () {
      spyBasketServiceRemove = spyOn(basketService, 'removeItem').andCallThrough();
      basketItem = basketService.addItem(pizza1, 5);
      $scope.removeItemFromBasket(basketItem);
    });

    it('Should call the basket service to remove that item', function () {
      expect(spyBasketServiceRemove).toHaveBeenCalledWith(basketItem);
    });

    it('Should have no items in the basket', function () {
      expect(basketService.basket.items.length).toBe(0);
    });
  });
});
