'use strict';

describe('Controller: ALaCarteCtrl', function(){
  var $controllerService, $scope, $locationService,
    controller,
    pizzasMockResponse,
	  mockInventoryService,
    basketService;

  beforeEach(function () {
    module('c24.PizzaDiAngeloApp');
    module('c24.PizzaDiAngeloApp.controllers');
  });

  beforeEach(inject(function($injector, $controller, $rootScope, $location){
    pizzasMockResponse = [ { id: 1, name: 'Thin Crust' } ];
  	$controllerService = $controller;
    $locationService = $location;
    $scope = $rootScope.$new();

    mockInventoryService = sinon.stub({ fetchBasePizzas: function () {} });
    basketService = $injector.get('BasketService');

    mockInventoryService.fetchBasePizzas.returns(pizzasMockResponse);
    controller = $controllerService('ALaCarteCtrl', {
      $scope: $scope,
      $location: $locationService,
      InventoryService: mockInventoryService,
      BasketService: basketService
    });
  }));

  it('Pizzas are defined', function(){
  	expect($scope.pizzas).toBe(pizzasMockResponse);
  });

  describe('When checkout is done', function () {
    var locationPathSpy;
    beforeEach(function () {
      locationPathSpy = spyOn($locationService, 'path');
      $scope.checkout();
    });

    it('Should use the location service to navigate to checkout', function () {
      expect(locationPathSpy).toHaveBeenCalledWith('checkout');
    });
  });

  describe('When adding 5 pizzas of the same type', function() {
    var firstPizza,
      addItemSpy;
    beforeEach(function () {
      addItemSpy = spyOn(basketService, 'addItem').andCallThrough();
      firstPizza = $scope.pizzas[0]
      $scope.addToBasket(firstPizza);
      $scope.addToBasket(firstPizza);
      $scope.addToBasket(firstPizza);
      $scope.addToBasket(firstPizza);
      $scope.addToBasket(firstPizza);
    });

    it('Pizzas count in the basket shoud be 5', function(){
      var pizza = $scope.pizzas[0];
      expect(pizza.inBasketCount).toBe(5);
    });

    it('BasketService.addItem should be called', function(){
      expect(addItemSpy).toHaveBeenCalled();
    });

    describe('When removing pizzas', function() {
      var pizza,
        removeItemSpy;
      beforeEach(function () {
        pizza = $scope.pizzas[0];
        removeItemSpy = spyOn(basketService, 'removeItem').andCallThrough();
        $scope.extractFromBasket(pizza);
      });

      it('Pizzas should decrease pizza basket item count', function(){
        expect(pizza.inBasketCount).toBe(4);
      });

      it('BasketService.removeItem should be called', function(){
        expect(removeItemSpy).toHaveBeenCalled();
      });
    });
  });
});
