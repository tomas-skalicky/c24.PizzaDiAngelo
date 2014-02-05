'use strict';

describe('BasketServiceSpec', function () {
  var $http, $timeout, httpMock, service;

  beforeEach(function () {
    module('c24.PizzaDiAngeloApp');
    module('c24.PizzaDiAngeloApp.services');
  });

  beforeEach(inject(function ($injector) {
    $http = $injector.get('$http');
    $timeout = $injector.get('$timeout');
    httpMock = $injector.get('$httpBackend');
    service = $injector.get('BasketService');
  }));

  describe('When the user adds a item to the basket', function () {
    it('Should return a new basketItem and calculates the price', function () {
      var pizza = { id: 1, name: 'Vegetarian Pizza', price: 5 };

      var basketItem = service.addItem(pizza, 2);
      expect(basketItem).toBeDefined();
      expect(service.basket.items.length).toEqual(1);
      expect(service.basket.price).toEqual(10);
    });
  });

  describe('When the user adds a base pizza to the basket', function () {
    var pizza;
    beforeEach(function () {
      pizza = { id: 1, name: 'Thin Crust', price: 1.5 };
    });

    describe('When the user adds ingredients', function () {
      var basketItem;
      beforeEach(function () {
        basketItem = service.addBaseItem(pizza, 2);
      });

      it('Should be marked as a base pizza', function () {
        expect(basketItem.isBasePizza).toBe(true);
      });

      it('Should have empty ingredients', function () {
        expect(basketItem.ingredients).toBeDefined();
        expect(basketItem.ingredients.length).toBe(0);
      });
    });

    describe('When the user adds no ingredients', function () {
      var basketItem;
      beforeEach(function () {
        basketItem = service.addBaseItem(pizza, 2, [ {"id":1,"name":"Mushroom","price":1} ]);
      });

      it('Should be marked as a base pizza', function () {
        expect(basketItem.isBasePizza).toBe(true);
      });

      it('Should have one ingredient', function () {
        expect(basketItem.ingredients).toBeDefined();
        expect(basketItem.ingredients.length).toBe(1);
      });
    });
  });

  describe('When the user wants to remove a item', function () {
    var basketItem;
    beforeEach(function () {
      var pizza = { id: 1, name: 'Vegetarian Pizza', price: 5 };
      basketItem = service.addItem(pizza, 5);
    });

    describe('When no item count is passed to the "removeItem" method', function () {
      beforeEach(function () {
        service.removeItem(basketItem);
      });

      it('Should be removed from basket items', function () {
        expect(service.basket.items.length).toEqual(0);
      });
      it('Should recalculate the basket price and set it to 0', function () {
        expect(service.basket.price).toEqual(0);
      });
      it('Should recalculate the item price and set it to 0', function () {
        expect(basketItem.price).toEqual(0);
      });
      it('Should set the basket item pizza count to 0', function () {
        expect(basketItem.count).toEqual(0);
      });
    });

    describe('When an item count is also passed to the "removeItem" method', function () {
      describe('When the item count passed is lower than the basket item count', function () {
        beforeEach(function () {
          service.removeItem(basketItem, 4);
        });

        it('Should not remove the item from the basket, but lower the item count', function () {
          expect(service.basket.items.length).toEqual(1);
          expect(basketItem.count).toEqual(1);
        });
        it('Should calculate the correct price', function () {
          expect(service.basket.price).toEqual(5);
        });
      });

      describe('When the item count passed is bigger than the basket item count', function () {
        beforeEach(function () {
          service.removeItem(basketItem, 6);
        });

        it('Should remove item from the basket', function () {
          expect(service.basket.items.length).toEqual(0);
        });

        it('Should recalculate and set the basket price to 0', function () {
          expect(service.basket.items.length).toEqual(0);
        });

        it('Should recalculate the item price and set it to 0', function () {
          expect(basketItem.price).toEqual(0);
        });
        it('Should set the basket item pizza count to 0', function () {
          expect(basketItem.count).toEqual(0);
        });
      });
    });
  });

  describe('When the user will order the items that are in the basket', function () {
    it('Should send the content of the basket to the server and empty the basket after it', function () {
      var pizza = { id: 1, name: 'Vegetarian Pizza', price: 5 };
      service.addItem(pizza, 2);

      service.order().then(function () {
        expect(service.basket.items.length).toEqual(0);
        expect(service.basket.price).toEqual(0);
      });

      $timeout.flush();
    });
  });

  describe('When the user added the same pizza twice', function () {
    it('Should update the existing basket item', function () {
      var pizza = { id: 1, name: 'Vegetarian Pizza', price: 5 };
      service.addItem(pizza, 2);
      var basketItem = service.addItem(pizza, 2);
      expect(basketItem.price).toEqual(20);
      expect(service.basket.items.length).toEqual(1);
    });
  });
});


