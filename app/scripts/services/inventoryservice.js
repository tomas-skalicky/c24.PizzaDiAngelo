'use strict';

var services = services || angular.module('c24.PizzaDiAngeloApp.services', []),
    domainName = 'http://localhost:3000';

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
    if (data !== undefined) {
      deferred.resolve(data);
    } else {
      $http.get(domainName +'/api/' + what)
        .success(function (data, status, headers, config) {
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
