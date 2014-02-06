(function() {
  'use strict';

  require.config({
    baseUrl: './scripts/',
    urlArgs: 'v=' + new Date().getTime(),
    paths: {
      'angular': './../lib/angular/angular',
      'angular-route': './../lib/angular-route/angular-route',
      'angular-resource': './../lib/angular-resource/angular-resource'
    },
    shim: {
      'angular': { exports: 'angular' },
      'angular-route': { deps: ['angular'] },
      'angular-resource': { deps:['angular']}
    }
  });

  require(['angular', './app'], function(angular, appModule) {
    angular.bootstrap(document , ['c24.PizzaDiAngeloApp']);
  });
})();
