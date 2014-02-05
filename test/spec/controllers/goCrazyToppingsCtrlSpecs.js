'use strict';

describe('Controller: GoCrazyLayersCtrl', function(){
  var $controllerService,
    $scope,
    $locationService,
    ingredientsMockResponse,
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
    basketService = BasketService;
    ingredientsMockResponse = [{"id":1,"name":"Mushroom","price":1},{"id":2,"name":"Pepperoni","price":1},{"id":3,"name":"Chips","price":1},{"id":4,"name":"Tomatoes","price":1},{"id":5,"name":"Pepperoni","price":1},{"id":6,"name":"Ananas","price":1},{"id":7,"name":"Chilli","price":0.5},{"id":8,"name":"Cheese","price":0.5}];
    $controllerService = $controller;
    $locationService = $location;
    $scope = $rootScope.$new();

    spyInventoryFetchIngredients = spyOn(InventoryService, 'fetchIngredients').andReturn(ingredientsMockResponse);

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

  describe('When the user adds an ingredient to the selected basket item', function () {
    var selectedIngredient;
    beforeEach(function () {
      selectedIngredient = $scope.ingredients[0];
    });
    describe('When the ingredient doesnt exist', function () {
      beforeEach(function () {
        $scope.addOrRemoveIngredientsOfPizza(selectedIngredient, true);
      });
      it('Should add selectedIngredient to the selectedBasketItem', function () {
        expect($scope.selectedBasketItem.ingredients.indexOf(selectedIngredient)).not.toBe(-1);
      });

    });
    describe('When the ingredient exists', function () {
      beforeEach(function () {
        $scope.addOrRemoveIngredientsOfPizza(selectedIngredient, true);
        $scope.addOrRemoveIngredientsOfPizza(selectedIngredient, true);
      });
      it('Should add selectedIngredient to the selectedBasketItem only once', function () {
        expect($scope.selectedBasketItem.ingredients.length).toBe(1);
      });

    });

    describe('When the user removes an ingredient from the selected basket item', function () {
      var selectedIngredient;
      beforeEach(function () {
        selectedIngredient = $scope.ingredients[0];
      });
      describe('When the ingredient doesnt exist', function () {
        beforeEach(function () {
          $scope.addOrRemoveIngredientsOfPizza(selectedIngredient, false);
        });
        it('Should remove selectedIngredient from the selectedBasketItem', function () {
          expect($scope.selectedBasketItem.ingredients.indexOf(selectedIngredient)).toBe(-1);
        });

      });
      describe('When the ingredient exists', function () {
        beforeEach(function () {
          $scope.addOrRemoveIngredientsOfPizza(selectedIngredient, false);
        });
        it('Should remove selectedIngredient from the selectedBasketItem', function () {
          expect($scope.selectedBasketItem.ingredients.length).toBe(0);
        });

      });
    });
  });
});
