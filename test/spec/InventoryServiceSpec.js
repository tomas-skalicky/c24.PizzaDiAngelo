'use strict';

describe('InventoryService Spec', function () {
  var httpMock;
  var inventoryService;

  beforeEach(function () {
    module('c24.PizzaDiAngeloApp');
    module('c24.PizzaDiAngeloApp.services');
  });

  beforeEach(inject(function ($injector) {
    httpMock = $injector.get('$httpBackend');
    inventoryService = $injector.get('InventoryService');
  }));

  it('should fetch all pizzas from our restserver', function () {
    var expectedResult = [ { id: 1, name: 'Vegetarian Pizza' } ];

    httpMock.expectGET('/api/pizzas').respond(200, expectedResult);

    inventoryService.fetchPizzas()
      .then(function (pizzas) {
        expect(pizzas).toBeDefined();
        expect(pizzas.length).toEqual(1);
      });

    httpMock.flush();
  });

  it('should fetch all base pizzas from our restserver', function () {
    var expectedResult = [ { id: 1, name: 'Thin Crust' } ];

    httpMock.expectGET('/api/basepizzas').respond(200, expectedResult);

    inventoryService.fetchBasePizzas()
      .then(function (basePizzas) {
        expect(basePizzas).toBeDefined();
        expect(basePizzas.length).toEqual(1);
      });

    httpMock.flush();
  });

  it('should fetch all sizes from our restserver', function () {
    var expectedResult = [ { id: 1, name: 'Small' } ];

    httpMock.expectGET('/api/sizes').respond(200, expectedResult);

    inventoryService.fetchSizes()
      .then(function (sizes) {
        expect(sizes).toBeDefined();
        expect(sizes.length).toEqual(1);
      });

    httpMock.flush();
  });

  it('should fetch all ingredients from our restserver', function () {
    var expectedResult = [ { id: 1, name: 'Mushroom' } ];

    httpMock.expectGET('/api/ingredients').respond(200, expectedResult);

    inventoryService.fetchIngredients()
      .then(function (ingredients) {
        expect(ingredients).toBeDefined();
        expect(ingredients.length).toEqual(1);
      });

    httpMock.flush();
  });


});
