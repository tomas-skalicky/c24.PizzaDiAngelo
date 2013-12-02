'use strict';

describe('Controller: ALaCarteCtrl', function(){
  var $controllerService, $scope,
    controller,
    pizzasMockResponse,
	  mockInventoryService,
    basketService;

  beforeEach(function () {
    module('c24.PizzaDiAngeloApp');
    module('c24.PizzaDiAngeloApp.controllers');
  });

  beforeEach(inject(function($injector, $controller, $rootScope){
    pizzasMockResponse = [ { id: 1, name: 'Thin Crust' } ];
  	$controllerService = $controller;
    $scope = $rootScope.$new();

    mockInventoryService = sinon.stub({ fetchBasePizzas: function () {} });
    basketService = $injector.get('BasketService');

    mockInventoryService.fetchBasePizzas.returns(pizzasMockResponse);
    controller = $controllerService('ALaCarteCtrl', {
      $scope: $scope,
      InventoryService: mockInventoryService,
      BasketService: basketService
    });
  }));

  it('Pizzas are defined', function(){
  	expect($scope.pizzas).toBe(pizzasMockResponse);
  });

  describe('When adding pizzas', function() {
    it('Pizzas added should increase pizza.inBasketCount', function(){
      var pizza = $scope.pizzas[0];
      $scope.addToBasket(pizza);
      expect(pizza.inBasketCount).toBe(1);
    });

    it('BasketService.addItem should be called', function(){
      var pizza = $scope.pizzas[0],
        spy = spyOn(basketService, 'addItem');

      $scope.addToBasket(pizza);

      expect(spy.wasCalled).toBe(true);
    });
  });

  describe('When removing pizzas', function() {
    it('Pizzas added should decrease pizza.inBasketCount', function(){
      var pizza = $scope.pizzas[0];
      pizza.inBasketCount = 10;
      $scope.extractFromBasket(pizza);
      expect(pizza.inBasketCount).toBe(9);
    });

    it('BasketService.removeItem should be called', function(){
      var pizza = $scope.pizzas[0],
        spy = spyOn(basketService, 'removeItem');

      $scope.extractFromBasket(pizza);

      expect(spy.wasCalled).toBe(true);
    });
  });
});
