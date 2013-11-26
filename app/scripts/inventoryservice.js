'use strict';

var services = services || angular.module('c24.PizzaDiAngeloApp.services', []);

services.factory('InventoryService', ['$http', '$q', function ($http, $q) {
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

    $http({
      method: 'GET',
      url: '/api/' + what
    })
    .success(function (data, status, headers, config) {
      deferred.resolve(data);
    })
    .error(function (data, status, headers, config) {
      deferred.reject(new Error('Unexpected server error while fetching ' + what));
    });

    return deferred.promise;
  }

  return {
    fetchPizzas: fetchPizzas,
    fetchBasePizzas: fetchBasePizzas,
    fetchSizes: fetchSizes,
    fetchIngredients: fetchIngredients
  };
}]);
