(function() {

  'use strict';

  describe('nex.autocomplete module', function() {

    beforeEach(module('nex.autocomplete'));

    describe('autocomplete controller', function(){
      var autocompleteCtrl, scope, AutocompleteService, httpBackend, data, promise, spy;

      promise = {
        then: function() {}
      };

      data = [];

      beforeEach(inject(function ($rootScope, $controller, $httpBackend) {

        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        $httpBackend.whenGET('data.json').respond(data);

        AutocompleteService = {
          getSuggestions: function() {}
        };
        spy = spyOn(AutocompleteService, 'getSuggestions').and.returnValue(promise);

        autocompleteCtrl =
          $controller(
            'AutocompleteCtrl',
            { $scope: scope,
              AutocompleteService: AutocompleteService
          });

          scope.$digest();
      }));
      
      it('controller should be defined', function() {
        expect(autocompleteCtrl).toBeDefined();
      });

      it('get autocomplete options when changing word is a username in the beginning of a sentance', function() {
        scope.userComment = "@s";
        scope.$digest();
        scope.userComment = "@sp";
        scope.$digest();
        expect(spy).toHaveBeenCalledWith("@sp");
      });

      it('get autocomplete options when changing word is a username in the middle of a sentance', function() {
        scope.userComment = "Hi there @t cat";
        scope.$digest();
        scope.userComment = "Hi there @to car";
        scope.$digest();
        expect(spy).toHaveBeenCalledWith("@to");
      });

      it('get autocomplete options when changing word is a username in the end of a sentance', function() {
        scope.userComment = "Hi @";
        scope.$digest();
        scope.userComment = "Hi @j";
        scope.$digest();
        expect(spy).toHaveBeenCalledWith("@j");
      });

      it('no autocomplete options when changing word which is a plain word', function() {
        scope.userComment = "Hi ther";
        scope.$digest();
        scope.userComment = "Hi there";
        scope.$digest();
        expect(spy.calls.count()).toEqual(0);
      });

      it('no autocomplete options when changing word starting with special char', function() {
        scope.userComment = "Hi ther !@r";
        scope.$digest();
        scope.userComment = "Hi there !@re";
        scope.$digest();
        expect(spy.calls.count()).toEqual(0);
      });

    });
  });
}());