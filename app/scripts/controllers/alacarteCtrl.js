(function (controllers) {
  'use strict';

  controllers.controller('ALaCarteCtrl', function ($scope, $location, InventoryService, BasketService) {
    $scope.pizzas = [];
    $scope.isEmpty = true;
    $scope.basketItems = BasketService.basket.items;

    $scope.filteredPizzas = [];
    $scope.currentPizzasList = [];
    $scope.pizzasPerPage = 10;

    $scope.startPageIndex = 0;
    $scope.currentPageIndex = 0;

    InventoryService.fetchPizzas().then(function (pizzas) {
      $scope.pizzas = pizzas;
      $scope.filteredPizzas = pizzas;
      $scope.setCurrentpizzasAccordingPage($scope.startPageIndex);

    });

    $scope.addToBasket = function (pizza) {
      var basketItem = BasketService.addItem(pizza, 1);
    };

    $scope.extractFromBasket = function (pizza) {
      var basketItems = BasketService.getItemsByPizzaId(pizza.id),
        basketItem;

      if (basketItems.length > 0) {
        basketItem = basketItems[0];
        BasketService.removeItem(basketItem, 1);
      }
    };

    $scope.getPizzaCountFromBasket = function (pizza) {
      var basketItem = BasketService.getItemsByPizzaId(pizza.id)[0];
      if (basketItem) {
        return basketItem.count;
      }
      return 0;
    };

    $scope.checkout = function () {
      $location.path('checkout');
    };

    $scope.$watch('basketItems', function (newValue, oldValue) {
      $scope.isEmpty = $scope.basketItems.length === 0;
    }, true);

    $scope.$watch('filteredPizzas', function (newValue, oldValue) {
      $scope.setCurrentpizzasAccordingPage($scope.currentPageIndex);
    });

    $scope.getPageCount = function () {
      if ($scope.filteredPizzas.length === 0) {
        return 1;
      }

      return Math.ceil($scope.filteredPizzas.length / $scope.pizzasPerPage);
    };

    $scope.setCurrentpizzasAccordingPage = function (pagenumber) {
      var newPagenumber;

      if ($scope.getPageCount() <= pagenumber) {
        newPagenumber = $scope.startPageIndex;
      } else {
        newPagenumber = pagenumber;
      }

      var startIndex = newPagenumber * $scope.pizzasPerPage;

      $scope.currentPageIndex = newPagenumber;
      $scope.currentPizzasList = $scope.filteredPizzas.slice(startIndex, startIndex + $scope.pizzasPerPage);
    };

    $scope.range = function (min, max) {
      var input = [];
      for (var i = min; i < max; i += 1) input.push(i);
      return input;
    };

    $scope.filterPizzas = function () {
      if ($scope.search === '') {
        $scope.filteredPizzas = $scope.pizzas;

        return;
      }
      $scope.filteredPizzas = $scope.pizzas.filter(function (element) {
        return element.name.indexOf($scope.search) > -1;
      });
    };
  });

})(controllers);
