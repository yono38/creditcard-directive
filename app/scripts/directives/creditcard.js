'use strict';

/**
 * @ngdoc directive
 * @name ccApp.directive:creditCard
 * @description
 * # creditCard
 */
angular.module('ccApp')
  .directive('creditCard', function () {
    return {
      template: '<div class="credit-card-wrapper" ng-class="cardValid"> \
        <div class="credit-card-icon" ng-class="cardType"></div> \
        <input type="number" ng-model="cardNumber" ng-keyup="validateCard()" placeholder="1234 5678 9123 4567" /> \
      </div>',
      restrict: 'E',
      scope: {
        cardNumber: '=',
        cardValid: '='
      },
      link: function postLink(scope, element) {

        // focus on the input if you click anywhere in the directive
        element.bind('click', function() {
          element.find('input').focus();
        });
                
        var checkLuhn = function() {
          /**
           * Variant of ShirtlessKirk's "fast" luhn validation
           * see: https://gist.github.com/ShirtlessKirk/2134376
           * @author ShirtlessKirk. Copyright (c) 2012.
           * Licensed under WTFPL (http://www.wtfpl.net/txt/copying)
           */

          var luhn = scope.cardNumber ? scope.cardNumber.toString() : '',
              len = luhn.length,
              mul = 0,
              prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
              sum = 0;
          // User hasn't finished typing card yet 
          if (luhn.length < 15) {
            return null;
          } else {

            while (len--) {
              sum += prodArr[mul][parseInt(luhn.charAt(len), 10)];
              mul ^= 1;
            }

            return (sum % 10 === 0 && sum > 0) ? 'valid' : 'invalid';
          }
        };

        var checkType = function() {
          var number = scope.cardNumber,
              key,
              cardTest;

          // Regex rules taken from http://en.wikipedia.org/wiki/Bank_card_number
          // Thanks Lucas!
          cardTest = {
            mastercard: /^5[1-5]/,
            visa: /^4/,
            amex: /^3[47]/,
            discover: /^6011/
          };

          for (key in cardTest) {
            // use hasOwnProperty just to be on the safe side
            if (cardTest.hasOwnProperty(key) && cardTest[key].test(number)) {
              return key;
            }
          }

        };

        // Called on keyup, wrote my own validation in controller but could have used angular-style
        // validation if I'd wanted
        scope.validateCard = function() {
          scope.cardType = checkType();
          scope.cardValid = checkLuhn();
        };
      }
    };
  });
