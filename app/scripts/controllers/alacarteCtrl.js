'use strict';

angular.module('c24.PizzaDiAngeloApp.controllers', ['c24.PizzaDiAngeloApp.services'])
	.controller('ALaCarteCtrl', function ($scope, $timeout, InventoryService, BasketService) {
		$scope.pizzas = InventoryService.fetchBasePizzas();

		$scope.addToBasket = function(pizza) {
			BasketService.addItem(pizza, 1);
			pizza.inBasketCount = BasketService.getTotalPizzaCountByPizzaId(pizza.id);
		};

		$scope.extractFromBasket = function(pizza) {
			var basketItems = BasketService.getItemsByPizzaId(pizza.id),
				basketItem;

			if(basketItems.length > 0) {
				basketItem = basketItems[0];
				BasketService.removeItem(basketItem);
				pizza.inBasketCount = BasketService.getTotalPizzaCountByPizzaId(pizza.id);
			}
		};
	});