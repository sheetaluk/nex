(function() {
  'use strict';

  angular.module('nex.autocomplete', ['ngRoute'])
  .config(
    ['$routeProvider', 
      function($routeProvider) {
        $routeProvider.when(
          '/autocomplete', {
            templateUrl: 'autocomplete/autocomplete.html',
            controller: 'AutocompleteCtrl'
          }
        );
      }
    ]
  )

  .service(
    'AutocompleteService',
    function($http, $q) {
      
      var dataPromise = $http.get('data.json');

      this.getSuggestions = function(username) {
        var deferred = $q.defer();
        var suggestions = [];
        var cleanUsername = username.substr(1).toLowerCase();
        
        dataPromise.success(function(data) {
          for (var i = 0; i < data.length; i=i+1) {
            if (data[i].username.toLowerCase().indexOf(cleanUsername) > -1 ||
              data[i].name.toLowerCase().indexOf(cleanUsername) > -1) {
              if (suggestions.length <= 5) {
                suggestions.push(data[i]);
              }
            }
          }
          deferred.resolve(suggestions);
        });
        return deferred.promise;
      }; 
  })

  .directive('focus', function($timeout, $parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        scope.$watch(attrs.focus, function(newValue, oldValue) {
          if (newValue) {
            element[0].focus();
          }
        });
        element.bind("blur", function(e) {
          $timeout(function() {
            scope.$apply(attrs.focus + "=false"); 
          }, 0);
        });
        element.bind("focus", function(e) {
          $timeout(function() {
            scope.$apply(attrs.focus + "=true");
          }, 0);
        });
      }
    };
  })

  .directive('keyTrap', function() {
    return function( scope, elem ) {
      elem.bind('keydown', function( event ) {
        scope.$broadcast('keydown', event );
      });
    };
  })

  .controller(
    'AutocompleteCtrl',
    function($scope, AutocompleteService) {
      var previousUserComment = "";
      var currentUserComment = "";
      var changedWord = {};
      var isUsernameComplete = false;

      var hideAutocompleteResults = function() {
        $scope.showSuggestions = false;
        $scope.items = [];
      };

      var showAutocompleteResults = function(data) {
        $scope.showSuggestions = true;
        $scope.items = data;
      };

      var isUsername = function(word) {
        var usernameRegex = /^[@][a-zA-Z]+[0-9A-Za-z]*$/i;
        if(word.match(usernameRegex)) {
          return true;
        }
        return false;
      };

      var getFirstChangedWord = function(prev, curr) {
        var prevWords = [];
        var currWords = [];
        var diff = {};

        prevWords = prev.split(" ");
        currWords = curr.split(" ");

        for (var i=0; i<prevWords.length; i=i+1) {
          if (prevWords[i] !== currWords[i]) {
            break;
          }
        }

        diff.word = currWords[i];
        diff.position = i;
        return diff;
      };

      var setupListenerKeys = function() {
        $scope.keys = [];
        $scope.keys.push(
          { code: 13,
            action: function(event) {
              if ($scope.items.length > 0) {
                event.preventDefault();
                $scope.select($scope.items[$scope.focusIndex].username);
              }
        }});
        $scope.keys.push(
          { code: 38,
            action: function() {
              $scope.focusIndex = 
                ((($scope.focusIndex - 1) % $scope.items.length) +
                  $scope.items.length) % $scope.items.length;
        }});
        $scope.keys.push(
          { code: 40,
            action: function() {
              $scope.focusIndex =
                ($scope.focusIndex + 1) % $scope.items.length;
        }});
      };

      $scope.userComment = "";
      $scope.items = [];
      $scope.toFocus = true;
      $scope.focusIndex = 0;
      
      hideAutocompleteResults();
      setupListenerKeys();

      $scope.$on('keydown', function( msg, event ) {
        $scope.keys.forEach(function(o) {
          if (o.code !== event.keyCode) {
            return;
          }
          o.action(event);
          $scope.$apply();
        });
      });
      
      $scope.$watch(
        'userComment',
        function(newUserComment) {

          previousUserComment = currentUserComment;
          currentUserComment = newUserComment;

          changedWord =
            getFirstChangedWord(
              previousUserComment, currentUserComment);
          if(changedWord.word && isUsername(changedWord.word) && !isUsernameComplete) {
            AutocompleteService.getSuggestions(changedWord.word).then(function(data) {
              if(data.length > 0) {
                showAutocompleteResults(data);
              } else {
                hideAutocompleteResults();
              }
            });

          } else {
            hideAutocompleteResults();
          }

          isUsernameComplete = false;
      });

      $scope.select = function(username) {
        var arr =
          $scope.userComment.split(" ");
        arr.splice(changedWord.position,1,"@"+username+" ");
        $scope.userComment = arr.join(" ");

        isUsernameComplete = true;
        hideAutocompleteResults();
        $scope.toFocus = true;
      };
  });
}());
