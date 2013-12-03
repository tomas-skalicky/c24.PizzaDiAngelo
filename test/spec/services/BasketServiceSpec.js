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

  describe('When the user wants to remove a item', function () {
    it('Should removed from the basket items and recalculates the price', function () {
      var pizza = { id: 1, name: 'Vegetarian Pizza', price: 5 };
      var basketItem = service.addItem(pizza, 2);
      service.removeItem(basketItem);
      expect(service.basket.items.length).toEqual(0);
      expect(service.basket.price).toEqual(0);
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


