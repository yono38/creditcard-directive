'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('ccApp'));

  var MainCtrl,
    timeout,
    MockLog,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$timeout_) {
    scope = $rootScope.$new();
    timeout = _$timeout_;
    MockLog = jasmine.createSpyObj('$log', ['log']);

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $log: MockLog
    });
  }));

  describe('addCard', function() {

    it('should set submittingCard on addCard', function () {
      scope.addCard();
      scope.$digest();
      expect(scope.submittingCard).toBe(true);
      timeout.flush();
      expect(scope.submittingCard).toBe(false);
    });

    it('should log success on valid addCard', function () {
      scope.cardValid = 'valid';
      scope.addCard();
      scope.$digest();
      timeout.flush();
      expect(MockLog.log).toHaveBeenCalled();
      expect(MockLog.log).toHaveBeenCalledWith('Success!');
    });

    it('should log failure on invalid addCard', function () {
      scope.cardValid = 'invalid';
      scope.addCard();
      scope.$digest();
      timeout.flush();
      expect(MockLog.log).toHaveBeenCalled();
      expect(MockLog.log).toHaveBeenCalledWith('Failure :-(');
    });

  });

});
