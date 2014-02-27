(function () {
  'use strict';

  directives.directive('basket', function () {
    return {
      restrict: 'E',
      //template: '<div></div>',
      templateUrl: 'views/basket.html',
      controller: 'BasketCtrl',
      link: function (scope, element, attrs) {
        scope.isEditable = attrs.editable === 'true' || false;
      }
    };
  });
})(directives);

