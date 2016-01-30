(function() {

  "use strict";

  angular.module(
    'nex',
    ['ngRoute',
      'nex.autocomplete']).
  config(
    ['$routeProvider',
      function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/autocomplete'});
  }]);
}());