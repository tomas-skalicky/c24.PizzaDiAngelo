'use strict';

describe('Controller: GoCrazyLayersCtrl', function(){
  var $controllerService,
    $scope,
    $locationService,
    controller,
    basePizzassMockResponse,
    inventoryService,
    spyInventoryServiceFetchPizzas,
    basketService;

  beforeEach(function () {
    module('c24.PizzaDiAngeloApp');
    module('c24.PizzaDiAngeloApp.controllers');
  });

  beforeEach(inject(function($injector, $controller, $rootScope, $location, $q, InventoryService, BasketService){
    inventoryService = InventoryService;
    basketService = BasketService;
    basePizzassMockResponse = [ { id: 1, name: 'Thin Crust' } ];
    $controllerService = $controller;
    $locationService = $location;
    $scope = $rootScope.$new();

    spyInventoryServiceFetchPizzas = spyOn(inventoryService, 'fetchBasePizzas').andReturn($q.when(basePizzassMockResponse));

    controller = $controllerService('GoCrazyLayersCtrl', {
      $scope: $scope,
      $location: $locationService,
      InventoryService: inventoryService,
      BasketService: basketService
    });

    $scope.$digest();
  }));

  it('Pizzas are defined', function(){
    expect($scope.basePizzas).toBe(basePizzassMockResponse);
  });

  describe('When the user wants to navigate to toppings', function () {
    var locationPathSpy;
    beforeEach(function () {
      locationPathSpy = spyOn($locationService, 'path');
      $scope.navigateToppings();
    });

    it('Should use the location service to navigate to toppings', function () {
      expect(locationPathSpy).toHaveBeenCalledWith('/gocrazy/toppings');
    });
  });

  describe('When adding 5 pizzas of the same type', function() {
    var firstPizza,
      addItemSpy;
    beforeEach(function () {
      addItemSpy = spyOn(basketService, 'addBaseItem').andCallThrough();
      firstPizza = $scope.basePizzas[0];
      $scope.addToBasket(firstPizza);
      $scope.addToBasket(firstPizza);
      $scope.addToBasket(firstPizza);
      $scope.addToBasket(firstPizza);
      $scope.addToBasket(firstPizza);
    });

    it('Pizzas count in the basket shoud be 5', function(){
      var pizza = $scope.basePizzas[0];
      expect($scope.getPizzaCountFromBasket(pizza)).toBe(5);
    });

    it('BasketService.addItem should be called', function(){
      expect(addItemSpy).toHaveBeenCalled();
    });

    it('BasketService.addItem should be called', function(){
      expect(addItemSpy).toHaveBeenCalled();
    });

    describe('When a user wants to know how many pizzas of that type are in the basket', function () {
      var pizzaCount;
      beforeEach(function () {
        pizzaCount = $scope.getPizzaCountFromBasket(firstPizza);
      });

      it('Should find 5 pizzas', function () {
        expect(pizzaCount).toBe(5);
      });
    });

    describe('When removing pizzas', function() {
      var pizza,
        removeItemSpy;
      beforeEach(function () {
        pizza = $scope.basePizzas[0];
        removeItemSpy = spyOn(basketService, 'removeItem').andCallThrough();
        $scope.extractFromBasket(pizza);
      });

      it('Pizzas should decrease pizza basket item count', function(){
        expect($scope.getPizzaCountFromBasket(pizza)).toBe(4);
      });

      it('BasketService.removeItem should be called', function(){
        expect(removeItemSpy).toHaveBeenCalled();
      });
    });
  });
});
