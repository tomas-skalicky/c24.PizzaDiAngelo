'use strict';

describe('Controller: ALaCarteCtrl', function(){
  var $controllerService, $scope,
  	controller,
	pizzasMockResponse = [ { id: 1, name: 'Thin Crust' } ],
	mockInventoryService;

  beforeEach(function () {
    module('c24.PizzaDiAngeloApp');
    module('c24.PizzaDiAngeloApp.controllers');
  });

  beforeEach(inject(function($controller, $rootScope){
  	$controllerService = $controller;
    $scope = $rootScope.$new();

    mockInventoryService = sinon.stub({ fetchBasePizzas: function () {} });

    mockInventoryService.fetchBasePizzas.returns(pizzasMockResponse);
	controller = $controllerService('ALaCarteCtrl', {
      $scope: $scope,
      InventoryService: mockInventoryService
    });
  }));

  it('Pizzas are defined', function(){
  	expect($scope.pizzas).toBe(pizzasMockResponse);
  });

  it('Pizzas added should increase pizza.inBasketCount', function(){
  	var pizza = $scope.pizzas[0];
  	$scope.addToBasket(pizza);
  	expect(pizza.inBasketCount).toBe(1);
  });

  it('Pizzas added should decrease pizza.inBasketCount', function(){
  	var pizza = $scope.pizzas[0];
  	pizza.inBasketCount = 10;
  	$scope.extractFromBasket(pizza);
  	expect(pizza.inBasketCount).toBe(9);
  });
});
