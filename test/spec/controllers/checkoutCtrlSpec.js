(function (argument) {
  'use strict';

  describe('Controller: CheckoutCtrl', function(){
    var $controllerService,
        $scope,
        $locationService,
        controller;

    beforeEach(function () {
      module('c24.PizzaDiAngeloApp');
      module('c24.PizzaDiAngeloApp.controllers');
    });

    beforeEach(inject(function($injector, $controller, $rootScope, $location){
      $controllerService = $controller;
      $locationService = $location;
      $scope = $rootScope.$new();

      controller = $controllerService('CheckoutCtrl', {
        $scope: $scope,
        $location: $locationService
      });
    }));

    describe('When the user wants to finish an order', function () {
      var locationPathSpy;
      beforeEach(function () {
        locationPathSpy = spyOn($locationService, 'path');
        $scope.finishOrder();
      });

      it('Should redirect to thank you page', function () {
        expect(locationPathSpy).toHaveBeenCalledWith('thankyou');
      });
    });
  });


})();
