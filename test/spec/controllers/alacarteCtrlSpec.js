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
      expect(addItemSpy).toBeHaveBeenCalled();
    });

    describe('When removing pizzas', function() {
      var pizza = $scope.pizzas[0],
        removeItemSpy;
      beforeEach(function () {
        removeItemSpy = spyOn(basketService, 'removeItem').andCallThrough();
        $scope.extractFromBasket(pizza);
      });

      it('Pizzas should decrease pizza basket item count', function(){
        expect(pizza.inBasketCount).toBe(4);
      });

      it('BasketService.removeItem should be called', function(){
        expect(removeItemSpy).toBeHaveBeenCalled();
      });
    });
  });
});
