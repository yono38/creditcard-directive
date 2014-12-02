'use strict';

describe('Directive: creditCard', function () {

  // load the directive's module
  beforeEach(module('ccApp'));

  var element,
    scope,
    isolated;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    scope.cardNum = null;
    scope.cardValid = null;
    element = angular.element('<credit-card card-valid="cardValid" card-number="cardNum"></credit-card>');
    element = $compile(element)(scope);
    scope.$digest();
    isolated = element.isolateScope();
  }));

  it('should focus input on element click', function() {
    // TODO add unit test
  });

  describe('luhn validation', function() {

    it ('should set luhn to null if card number less than 15 chars', function() {
      isolated.cardNumber = 6011111111;
      isolated.validateCard();
      scope.$digest();
      expect(isolated.cardValid).toBe(null);
    });

    it ('should set luhn to "valid" if card number is valid', function() {
      // valid numbers taken from http://www.paypalobjects.com/en_US/vhelp/paypalmanager_help/credit_card_numbers.htm
      var validCardNumbers = [378282246310005, 371449635398431, 6011111111111117, 6011000990139424, 5555555555554444, 4111111111111111, 4012888888881881];
      validCardNumbers.forEach(function(num) {
        isolated.cardNumber = num;
        isolated.validateCard();
        scope.$digest();
        expect(isolated.cardValid).toEqual('valid');
      });
    });

    it ('should set luhn to "invalid" if card is invalid' , function() {
      // Invalid card from https://docs.recurly.com/payment-gateways/test
      var invalidCardNumber = 4222222222222222;
      isolated.cardNumber = invalidCardNumber;
      isolated.validateCard();
      scope.$digest();
      expect(isolated.cardValid).toEqual('invalid');
    });

  });

  describe('card type validation', function() {

    it('should return card type on keyup', function() {
      var card, cardTest;
      // cards taken from paypal
      cardTest = {
        mastercard: 5555555555554444,
        visa: 4111111111111111,
        amex: 378282246310005,
        discover: 6011111111111117
      };
      for (card in cardTest) {
        if (cardTest.hasOwnProperty(card)) {
          isolated.cardNumber = cardTest[card];
          isolated.validateCard();
          scope.$digest();
          expect(isolated.cardType).toEqual(card);
        }
      }
    });

    it('should have undefined card type if no match', function() {
      // valid diner's club card
      var dinerCard = 30569309025904;
      isolated.cardNumber = dinerCard;
      isolated.validateCard();
      scope.$digest();
      expect(isolated.cardType).toBe(undefined);
    });

  });

});
