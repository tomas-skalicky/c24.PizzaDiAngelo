'use strict';

describe('Directives', function () {
  var $rootScope, $compile, $httpBackend;

  beforeEach(function () {
    module('c24.PizzaDiAngeloApp');
    module('c24.PizzaDiAngeloApp.directives');
    module('views/basket.html');

    inject(function ($injector, _$rootScope_) {
      $rootScope = _$rootScope_;
      $compile = $injector.get('$compile');
      $httpBackend = $injector.get('$httpBackend');
    });
  });

  var createAndCompileHtml = function (scope, html) {
    var element = angular.element(html);
    $compile(element)(scope);
    scope.$digest();
    return element;
  };

  describe('basket', function () {
    var $scope,
        html = '<basket editable="true"></basket>';

    beforeEach(function () {
      $scope = $rootScope;
      $httpBackend.whenGET('views/basket.html').respond('<div></div>');

      createAndCompileHtml($scope, html);
    });

    describe('When the element was created', function () {
      it('should set the isEditable property in the scope', inject(function () {
        expect($scope.isEditable).toBe(true);
      }));

    });
  });

});
