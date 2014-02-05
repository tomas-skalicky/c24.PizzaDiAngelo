'use strict';

describe('Controller: GoCrazyLayersCtrl', function(){
  var $controllerService,
    $scope,
    $locationService,
    controller,
    basePizzassMockResponse,
    mockInventoryService,
    basketService;

  beforeEach(function () {
    module('c24.PizzaDiAngeloApp');
    module('c24.PizzaDiAngeloApp.controllers');
  });

  beforeEach(inject(function($injector, $controller, $rootScope, $location){
    basePizzassMockResponse = [ { id: 1, name: 'Thin Crust' } ];
  	$controllerService = $controller;
    $locationService = $location;
    $scope = $rootScope.$new();

    mockInventoryService = sinon.stub({ fetchBasePizzas: function () {} });
    basketService = $injector.get('BasketService');

    mockInventoryService.fetchBasePizzas.returns(basePizzassMockResponse);
    controller = $controllerService('GoCrazyLayersCtrl', {
      $scope: $scope,
      $location: $locationService,
      InventoryService: mockInventoryService,
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
