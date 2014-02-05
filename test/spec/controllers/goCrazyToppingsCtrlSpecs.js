'use strict';

describe('Controller: GoCrazyLayersCtrl', function(){
  var $controllerService,
    $scope,
    $locationService,
    ingredientsMockResponse = [{"id":1,"name":"Mushroom","price":1},{"id":2,"name":"Pepperoni","price":1},{"id":3,"name":"Chips","price":1},{"id":4,"name":"Tomatoes","price":1},{"id":5,"name":"Pepperoni","price":1},{"id":6,"name":"Ananas","price":1},{"id":7,"name":"Chilli","price":0.5},{"id":8,"name":"Cheese","price":0.5}],
    basePizza1 = {
      id: 1,
      name: 'Thin Crust',
      price: 2
    },
    basePizza2 = {
      id: 2,
      name: 'Thick Crust',
      price: 2.5
    },
    basketService,
    spyInventoryFetchIngredients,
    controller;

  beforeEach(function () {
    module('c24.PizzaDiAngeloApp');
    module('c24.PizzaDiAngeloApp.controllers');
  });

  beforeEach(inject(function($injector, $controller, $rootScope, $location, InventoryService, BasketService){
  	$controllerService = $controller;
    $locationService = $location;
    $scope = $rootScope.$new();
    spyInventoryFetchIngredients = spyOn(InventoryService, 'fetchIngredients').andReturn(ingredientsMockResponse);

    basketService = BasketService;
    basketService.addBaseItem(basePizza1, 1);
    basketService.addBaseItem(basePizza2, 2);

    controller = $controllerService('GoCrazyToppingsCtrl', {
      $scope: $scope,
      $location: $locationService,
      InventoryService: InventoryService,
      BasketService: basketService
    });
  }));

  it('Should call the inventory service to fetch the ingredients', function(){
    expect(spyInventoryFetchIngredients).toHaveBeenCalled();
  });

  it('Should have ingredients defined', function(){
    expect($scope.ingredients).toBe(ingredientsMockResponse);
  });

  describe('When the user wants to navigate to checkout', function () {
    var locationPathSpy;
    beforeEach(function () {
      locationPathSpy = spyOn($locationService, 'path');
      $scope.checkout();
    });

    it('Should use the location service to navigate to checkout', function () {
      expect(locationPathSpy).toHaveBeenCalledWith('/checkout');
    });
  });
});
