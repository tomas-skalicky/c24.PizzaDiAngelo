'use strict';

describe('Controller: ChooseYourStyleCtrl', function(){
  var controller, scope;

  beforeEach(module('c24.PizzaDiAngeloApp'));

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope.$new();
    controller = $controller('ChooseYourStyleCtrl', {
      $scope: scope
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
});
