'use strict';

/**
 * @ngdoc function
 * @name ccApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ccApp
 */
angular.module('ccApp')
  .controller('MainCtrl', function ($scope, $timeout, $log) {
    $scope.addCard = function() {
      $scope.submittingCard = true;
      $timeout(function() {
        if ($scope.cardValid === 'valid') {
          $log.log('Success!');
        } else {
          $log.log('Failure :-(');
        }
        $scope.submittingCard = false;
      }, 3000);
    };
  });
