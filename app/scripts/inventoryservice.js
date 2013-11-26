'use strict';

var services = services || angular.module('c24.PizzaDiAngeloApp.services', []);

services.factory('InventoryService', ['$http', '$q', '$cacheFactory', function ($http, $q, $cacheFactory) {
  var that = this;
  this.cache = $cacheFactory('inventory');

  var fetchPizzas = function () {
    return fetchInventoryFromServer('pizzas');
  };

  var fetchSizes = function () {
    return fetchInventoryFromServer('sizes');
  };

  var fetchIngredients = function () {
    return fetchInventoryFromServer('ingredients');
  };

  var fetchBasePizzas = function () {
    return fetchInventoryFromServer('basepizzas');
  };

  function fetchInventoryFromServer(what) {
    var deferred = $q.defer();

    var data = that.cache.get(what);
    console.log('Cached data: ' + data);
    if (data !== undefined) {
      deferred.resolve(data);
    } else {
      $http.get('/api/' + what)
        .success(function (data, status, headers, config) {
          console.log('Rest data: ' + data);
          that.cache.put(what, data);
          deferred.resolve(data);
        })
        .error(function (data, status, headers, config) {
          deferred.reject(new Error('Unexpected server error while fetching ' + what));
        });
    }

    return deferred.promise;
  }

  return {
    fetchPizzas: fetchPizzas,
    fetchBasePizzas: fetchBasePizzas,
    fetchSizes: fetchSizes,
    fetchIngredients: fetchIngredients
  };
}]);
