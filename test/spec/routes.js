'use strict';

describe('Router: /', function(){
  var route, navigate;

  beforeEach(module('c24.PizzaDiAngeloApp'));

  beforeEach(inject(function($route, $location, $rootScope, $controller, $httpBackend){
    route = $route;
    $httpBackend.whenGET(/^views/).respond('');

    navigate = function(url){
      $location.path(url);
      $rootScope.$digest();
    };

    navigate('/');
  }));

  it('should start with chooseyourstyle controller', function(){
    expect(route.current.controller).toBe('ChooseYourStyleCtrl');
  });

  it('should take the chooseyourstyle view', function(){
    expect(route.current.templateUrl).toBe('views/chooseyourstyle.html');
  });
});
