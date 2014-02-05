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

  beforeEach(inject(function($injector, $controller, $rootScope, $location, InventoryService, BasketService){
    inventoryService = InventoryService;
    basketService = BasketService;
    basePizzassMockResponse = [ { id: 1, name: 'Thin Crust' } ];
    $controllerService = $controller;
    $locationService = $location;
    $scope = $rootScope.$new();

    spyInventoryServiceFetchPizzas = spyOn(inventoryService, 'fetchBasePizzas').andReturn(basePizzassMockResponse);

    controller = $controllerService('GoCrazyLayersCtrl', {
      $scope: $scope,
      $location: $locationService,
      InventoryService: inventoryService,
      BasketService: basketService
    });
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
});
