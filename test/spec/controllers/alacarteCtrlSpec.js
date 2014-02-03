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

  describe('When adding 5 pizzas of the same type', function() {
    beforeEach(function () {
      var firstPizza = $scope.pizzas[0];
      $scope.addToBasket(firstPizza);
      $scope.addToBasket(firstPizza);
      $scope.addToBasket(firstPizza);
      $scope.addToBasket(firstPizza);
      $scope.addToBasket(firstPizza);
    });

    it('Pizzas count in the basket shoud be 5', function(){
      expect(pizza.inBasketCount).toBe(5);
    });

    it('BasketService.addItem should be called', function(){
      var pizza = $scope.pizzas[0],
        spy = spyOn(basketService, 'addItem');

      $scope.addToBasket(pizza);

      expect(spy.wasCalled).toBe(true);
    });
  });

  describe('When removing pizzas', function() {
    beforeEach(function () {
      var firstPizza = $scope.pizzas[0];
      $scope.addToBasket(firstPizza);
      controller.addToBasket(firstPizza);
    });

    it('Pizzas should decrease pizza basket item count', function(){
      $scope.extractFromBasket(pizza);
      expect(pizza.inBasketCount).toBe(1);
    });

    it('BasketService.removeItem should be called', function(){
      var pizza = $scope.pizzas[0],
        spy = spyOn(basketService, 'removeItem');

      $scope.extractFromBasket(pizza);

      expect(spy.wasCalled).toBe(true);
    });
  });
});
