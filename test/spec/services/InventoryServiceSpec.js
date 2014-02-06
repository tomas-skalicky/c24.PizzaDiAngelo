'use strict';

describe('InventoryService Spec', function () {
  var $http;
  var httpMock;
  var inventoryService;
  var domainName = 'http://pizzaexpress-check24.rhcloud.com';

  beforeEach(function () {
    module('c24.PizzaDiAngeloApp');
    module('c24.PizzaDiAngeloApp.services');
  });

  beforeEach(inject(function ($injector) {
    $http = $injector.get('$http');
    httpMock = $injector.get('$httpBackend');
    inventoryService = $injector.get('InventoryService');
  }));

  it('should fetch all pizzas from our restserver', function () {
    var expectedResult = [ { id: 1, name: 'Vegetarian Pizza' } ];

    httpMock.expectGET(domainName + '/api/pizzas').respond(200, expectedResult);

    inventoryService.fetchPizzas()
      .then(function (pizzas) {
        expect(pizzas).toBeDefined();
        expect(pizzas.length).toEqual(1);
      });

    httpMock.flush();
  });

  it('should fetch all base pizzas from our restserver', function () {
    var expectedResult = [ { id: 1, name: 'Thin Crust' } ];

    httpMock.expectGET(domainName + '/api/basepizzas').respond(200, expectedResult);

    inventoryService.fetchBasePizzas()
      .then(function (basePizzas) {
        expect(basePizzas).toBeDefined();
        expect(basePizzas.length).toEqual(1);
      });

    httpMock.flush();
  });

  it('should fetch all ingredients from our restserver', function () {
    var expectedResult = [ { id: 1, name: 'Mushroom' } ];

    httpMock.expectGET(domainName + '/api/ingredients').respond(200, expectedResult);

    inventoryService.fetchIngredients()
      .then(function (ingredients) {
        expect(ingredients).toBeDefined();
        expect(ingredients.length).toEqual(1);
      });

    httpMock.flush();
  });

  describe('When fetch was called twice', function () {
    it('Should call the rest server not more than once', function () {
      var expectedResult = [ { id: 1, name: 'Mushroom' } ];

      spyOn($http, 'get').andCallThrough();

      httpMock.whenGET(domainName + '/api/ingredients').respond(200, expectedResult);

      inventoryService.fetchIngredients()
        .then(function (ingredients) {
          expect($http.get).toHaveBeenCalled();

          $http.get.reset();

          // Now we will start to the second call
          // the second call must be in the then function because it's async
          inventoryService.fetchIngredients()
            .then(function (ingredients) {
              expect($http.get).not.toHaveBeenCalled();
            });
        });

      httpMock.flush();
    });
  });


});
