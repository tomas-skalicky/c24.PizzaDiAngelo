'use strict';

describe('Router: /', function(){
  beforeEach(module('c24.PizzaDiAngeloApp'));

  var route, navigate, location;

  beforeEach(inject(function($route, $location, $rootScope, $controller, $httpBackend){
    route = $route;

    $httpBackend.whenGET(/^views/).respond('');

    navigate = function(url){
      $location.path(url);
      $rootScope.$digest();
    };
  }));

  it('should start with chooseyourstyle controller', function(){
    navigate('/');
    expect(route.current.controller).toBe('ChooseYourStyleCtrl');
  });
});
