'use strict';

angular.module('c24.PizzaDiAngeloApp.controllers', ['c24.PizzaDiAngeloApp.services'])
	.controller('ALaCarteCtrl', function ($scope, $timeout, InventoryService) {
		$scope.pizzas = InventoryService.fetchBasePizzas();

		$scope.addToBasket = function(pizza) {
			//Should relly on Basket service. Wee need that service to proceed
			var inBasketCount = (pizza.inBasketCount || 0) + 1;
			pizza.inBasketCount = inBasketCount;
		}

		$scope.extractFromBasket = function(pizza) {
			//Should relly on Basket service. Wee need that service to proceed
			var inBasketCount = (pizza.inBasketCount || 0) - 1;
			pizza.inBasketCount = inBasketCount;
		}
	});