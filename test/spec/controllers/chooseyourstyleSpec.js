'use strict';

describe('Controller: ChooseYourStyleCtrl', function(){
  var controller, scope, locationService;

  beforeEach(module('c24.PizzaDiAngeloApp'));

  beforeEach(inject(function($injector, $controller, $rootScope, $location){
    scope = $rootScope.$new();
    locationService = $location;
    controller = $controller('ChooseYourStyleCtrl', {
      $scope: scope,
      $location: locationService
    });
  }));

  it('should have styles to choose from', function(){
    expect(scope.styles).toBeDefined();
  });

  it('should define a selectedstyle value', function(){
    expect(scope.selectedstyle).toBeDefined();
  });

  it('should have style "A la Carte"', function(){
    expect(scope.styles).toContain('A la Carte');
  });

  it('should have style "Go Crazy"', function(){
    expect(scope.styles).toContain('Go Crazy');
  });

  describe('When the user wants to navigate', function () {
    var locationServicePathSpy;
      beforeEach(function () {
        locationServicePathSpy = spyOn(locationService, 'path');
      });

    describe('When wants to choose from the menu ("A la carte")', function () {
      beforeEach(function () {
        scope.selectedstyle = scope.styles[0];
        scope.navigate();
      });

      it('Should use $location to navigate to "alacarte"', function () {
        expect(locationServicePathSpy).toHaveBeenCalledWith('alacarte');
      });
    });

    describe('When wants customize "Go crazy"', function () {
      beforeEach(function () {
        scope.selectedstyle = scope.styles[1];
        scope.navigate();
      });

      it('Should use $location to navigate to "gocrazy"', function () {
        expect(locationServicePathSpy).toHaveBeenCalledWith('gocrazy/layers');
      });
    });
  });
});
