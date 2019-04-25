import Big from 'big.js';
import {
  Weight,
  GRAM,
  OUNCE,
  POUND,
  MILLIGRAM,
  KILOGRAM,
  UNIT,
  FLUID_OUNCE,
  grams,
  ounces,
  pounds,
  milligrams,
  kilograms,
  units,
  fluid_ounces,
} from '../src';

describe('Weight', () => {
  describe('constructor', () => {
    it('creates a new weight with an integer value', () => {
      const weight = new Weight(1, GRAM);
      expect(weight.value).toEqual(new Big(1));
      expect(weight.unit).toEqual(GRAM);
    });

    it('creates a new weight with an string value', () => {
      const weight = new Weight('1', GRAM);
      expect(weight.value).toEqual(new Big(1));
      expect(weight.unit).toEqual(GRAM);
    });

    it('creates a new weight with an Big value', () => {
      const weight = new Weight(new Big('1'), GRAM);
      expect(weight.value).toEqual(new Big(1));
      expect(weight.unit).toEqual(GRAM);
    });
  });

  describe('isZero', () => {
    it('returns true if the value is zero', () => {
      expect(units(0).isZero()).toEqual(true);
    });

    it('returns false if the value is greater than zero', () => {
      expect(grams(0.1).isZero()).toEqual(false);
    });

    it('returns false if the value is less than zero', () => {
      expect(grams(-0.1).isZero()).toEqual(false);
    });
  });

  describe('parse', () => {
    describe('for an invalid argument', () => {
      describe('for an undefined argument', () => {
        function call() {
          Weight.parse();
        }

        it('raises an error', () => {
          expect(call).toThrow('Invalid argument: String expected');
        });
      });

      describe('for a non-string argument', () => {
        function call() {
          Weight.parse(0);
        }

        it('raises an error', () => {
          expect(call).toThrow('Invalid argument: String expected');
        });
      });

      describe('for an invalid unit', () => {
        function call() {
          Weight.parse('1 bob');
        }

        it('raises an error', () => {
          expect(call).toThrow('Invalid weight');
        });
      });

      describe('for a blank string', () => {
        function call() {
          Weight.parse(' ');
        }

        it('raises an error', () => {
          expect(call).toThrow('Invalid number');
        });
      });
    });

    it('parses units', () => {
      expect(Weight.parse('1')).toEqual(new Weight(1, UNIT));
      expect(Weight.parse('1 ea')).toEqual(new Weight(1, UNIT));
      expect(Weight.parse('1 each')).toEqual(new Weight(1, UNIT));
      expect(Weight.parse('1 unit')).toEqual(new Weight(1, UNIT));
      expect(Weight.parse('2 units')).toEqual(new Weight(2, UNIT));
      expect(Weight.parse('2 UNiTs')).toEqual(new Weight(2, UNIT));
    });

    it('parses grams', () => {
      expect(Weight.parse('1.2 g')).toEqual(new Weight(1.2, GRAM));
      expect(Weight.parse('1.2 gram')).toEqual(new Weight(1.2, GRAM));
      expect(Weight.parse('1.2 grams')).toEqual(new Weight(1.2, GRAM));
    });

    it('parses ounces', () => {
      expect(Weight.parse('1.2 oz')).toEqual(new Weight(1.2, OUNCE));
      expect(Weight.parse('1.2 ounce')).toEqual(new Weight(1.2, OUNCE));
      expect(Weight.parse('1.2 ounces')).toEqual(new Weight(1.2, OUNCE));
    });

    it('parses pounds', () => {
      expect(Weight.parse('1.2 lb')).toEqual(new Weight(1.2, POUND));
      expect(Weight.parse('1.2 pound')).toEqual(new Weight(1.2, POUND));
      expect(Weight.parse('1.2 pounds')).toEqual(new Weight(1.2, POUND));
    });

    it('parses milligrams', () => {
      expect(Weight.parse('1.2 mg')).toEqual(new Weight(1.2, MILLIGRAM));
      expect(Weight.parse('1.2 milligram')).toEqual(new Weight(1.2, MILLIGRAM));
      expect(Weight.parse('1.2 milligrams')).toEqual(new Weight(1.2, MILLIGRAM));
    });

    it('parses kilograms', () => {
      expect(Weight.parse('1.2 kg')).toEqual(new Weight(1.2, KILOGRAM));
      expect(Weight.parse('1.2 kilogram')).toEqual(new Weight(1.2, KILOGRAM));
      expect(Weight.parse('1.2 kilograms')).toEqual(new Weight(1.2, KILOGRAM));
    });

    it('parses fluid ounces', () => {
      expect(Weight.parse('1.2 fl oz')).toEqual(new Weight(1.2, FLUID_OUNCE));
      expect(Weight.parse('1.2 fluid ounce')).toEqual(new Weight(1.2, FLUID_OUNCE));
      expect(Weight.parse('1.2 fluid ounces')).toEqual(new Weight(1.2, FLUID_OUNCE));
    });
  });

  describe('toString', () => {
    it('returns nice strings', () => {
      expect(units(1).toString()).toEqual('1');
      expect(grams('1.1').toString()).toEqual('1.1 g');
      expect(ounces('1.1').toString()).toEqual('1.1 oz');
      expect(pounds('1.1').toString()).toEqual('1.1 lb');
      expect(kilograms('1.1').toString()).toEqual('1.1 kg');
      expect(milligrams('1.1').toString()).toEqual('1.1 mg');
      expect(fluid_ounces('1.1').toString()).toEqual('1.1 fl oz');
    });
  });

  describe('to', () => {
    function testConversion(weight, toUnit, toValue, roundedToValue) {
      expect(weight.to(toUnit)).toEqual(new Weight(toValue, toUnit));
      expect(weight.to(toUnit).value.round(9)).toEqual(roundedToValue);
    }

    describe('from gram', () => {
      const weight = grams(1);

      it('converts to gram', () => {
        testConversion(weight, GRAM, new Big('1'), new Big('1'));
      });

      it('converts to ounce', () => {
        const toValue = (new Big('1')).div(new Big('28.34952'));
        testConversion(weight, OUNCE, toValue, new Big('0.035273966'));
      });

      it('convers to pound', () => {
        const toValue = (new Big('1')).div(new Big('453.59237'));
        testConversion(weight, POUND, toValue, new Big('0.002204623'));
      });

      it('converts to milligram', () => {
        const toValue = (new Big('1')).times(new Big('1000'));
        testConversion(weight, MILLIGRAM, toValue, new Big('1000'));
      });

      it('converts to kilogram', () => {
        const toValue = (new Big('1')).div(new Big('1000'));
        testConversion(weight, KILOGRAM, toValue, new Big('0.001'));
      });

      it('does not convert to unit', () => {
        function convert() {
          weight.to(UNIT);
        }

        expect(convert).toThrow('No conversion from gram to unit');
      });

      it('converts to fluid ounce', () => {
        const toValue = (new Big('1')).div(new Big('28.34952'));
        testConversion(weight, FLUID_OUNCE, toValue, new Big('0.035273966'));
      });
    });

    describe('from ounce', () => {
      const weight = ounces(1);

      it('converts to gram', () => {
        const toValue = (new Big('1')).times(new Big('28.34952'));
        testConversion(weight, GRAM, toValue, new Big('28.34952'));
      });

      it('converts to ounce', () => {
        testConversion(weight, OUNCE, new Big('1'), new Big('1'));
      });

      it('convers to pound', () => {
        const toValue = (new Big('1')).div(new Big('16'));
        testConversion(weight, POUND, toValue, new Big('0.0625'));
      });

      it('converts to milligram', () => {
        const toValue = (new Big('1')).times(new Big('28349.52'));
        testConversion(weight, MILLIGRAM, toValue, new Big('28349.52'));
      });

      it('converts to kilogram', () => {
        const toValue = (new Big('1')).times(new Big('0.02834952'));
        testConversion(weight, KILOGRAM, toValue, new Big('0.02834952'));
      });

      it('does not convert to unit', () => {
        function convert() {
          weight.to(UNIT);
        }

        expect(convert).toThrow('No conversion from ounce to unit');
      });

      it('converts to fluid ounce', () => {
        testConversion(weight, FLUID_OUNCE, new Big('1'), new Big('1'));
      });
    });

    describe('from pound', () => {
      const weight = pounds(1);

      it('converts to gram', () => {
        const toValue = (new Big('1')).times(new Big('453.59237'));
        testConversion(weight, GRAM, toValue, new Big('453.59237'));
      });

      it('converts to ounce', () => {
        const toValue = (new Big('1')).times(new Big('16'));
        testConversion(weight, OUNCE, toValue, new Big('16'));
      });

      it('convers to pound', () => {
        testConversion(weight, POUND, new Big('1'), new Big('1'));
      });

      it('converts to milligram', () => {
        const toValue = (new Big('1')).times(new Big('453592.37'));
        testConversion(weight, MILLIGRAM, toValue, new Big('453592.37'));
      });

      it('converts to kilogram', () => {
        const toValue = (new Big('1')).times(new Big('0.45359237'));
        testConversion(weight, KILOGRAM, toValue, new Big('0.45359237'));
      });

      it('does not convert to unit', () => {
        function convert() {
          weight.to(UNIT);
        }

        expect(convert).toThrow('No conversion from pound to unit');
      });

      it('converts to fluid ounce', () => {
        const toValue = (new Big('1')).times(new Big('16'));
        testConversion(weight, FLUID_OUNCE, toValue, new Big('16'));
      });
    });

    describe('from milligram', () => {
      const weight = milligrams(1);

      it('converts to gram', () => {
        const toValue = (new Big('1')).div(new Big('1000'));
        testConversion(weight, GRAM, toValue, new Big('0.001'));
      });

      it('converts to ounce', () => {
        const toValue = (new Big('1')).div(new Big('28349.52'));
        testConversion(weight, OUNCE, toValue, new Big('0.000035274'));
      });

      it('convers to pound', () => {
        const toValue = (new Big('1')).div(new Big('453592.37'));
        testConversion(weight, POUND, toValue, new Big('0.000002205'));
      });

      it('converts to milligram', () => {
        testConversion(weight, MILLIGRAM, new Big('1'), new Big('1'));
      });

      it('converts to kilogram', () => {
        const toValue = (new Big('1')).div(new Big('1000000'));
        testConversion(weight, KILOGRAM, toValue, new Big('0.000001'));
      });

      it('does not convert to unit', () => {
        function convert() {
          weight.to(UNIT);
        }

        expect(convert).toThrow('No conversion from milligram to unit');
      });

      it('converts to fluid ounce', () => {
        const toValue = (new Big('1')).div(new Big('28349.52'));
        testConversion(weight, FLUID_OUNCE, toValue, new Big('0.000035274'));
      });
    });

    describe('from kilogram', () => {
      const weight = kilograms(1);

      it('converts to gram', () => {
        const toValue = (new Big('1')).times(new Big('1000'));
        testConversion(weight, GRAM, toValue, new Big('1000'));
      });

      it('converts to ounce', () => {
        const toValue = (new Big('1')).div(new Big('0.02834952'));
        testConversion(weight, OUNCE, toValue, new Big('35.273965838'));
      });

      it('convers to pound', () => {
        const toValue = (new Big('1')).div(new Big('0.45359237'));
        testConversion(weight, POUND, toValue, new Big('2.204622622'));
      });

      it('converts to milligram', () => {
        const toValue = (new Big('1')).times(new Big('1000000'));
        testConversion(weight, MILLIGRAM, toValue, new Big('1000000'));
      });

      it('converts to kilogram', () => {
        testConversion(weight, KILOGRAM, new Big('1'), new Big('1'));
      });

      it('does not convert to unit', () => {
        function convert() {
          weight.to(UNIT);
        }

        expect(convert).toThrow('No conversion from kilogram to unit');
      });

      it('converts to fluid ounce', () => {
        const toValue = (new Big('1')).div(new Big('0.02834952'));
        testConversion(weight, FLUID_OUNCE, toValue, new Big('35.273965838'));
      });
    });

    describe('from unit', () => {
      const weight = units(1);

      it('does not convert to gram', () => {
        function convert() {
          weight.to(GRAM);
        }

        expect(convert).toThrow('No conversion from unit to gram');
      });

      it('does not convert to ounce', () => {
        function convert() {
          weight.to(OUNCE);
        }

        expect(convert).toThrow('No conversion from unit to ounce');
      });

      it('does not convert to pound', () => {
        function convert() {
          weight.to(POUND);
        }

        expect(convert).toThrow('No conversion from unit to pound');
      });

      it('does not convert to milligram', () => {
        function convert() {
          weight.to(MILLIGRAM);
        }

        expect(convert).toThrow('No conversion from unit to milligram');
      });

      it('does not convert to kilogram', () => {
        function convert() {
          weight.to(KILOGRAM);
        }

        expect(convert).toThrow('No conversion from unit to kilogram');
      });

      it('converts to unit', () => {
        testConversion(weight, UNIT, new Big('1'), new Big('1'));
      });

      it('does not convert to fluid ounce', () => {
        function convert() {
          weight.to(FLUID_OUNCE);
        }

        expect(convert).toThrow('No conversion from unit to fluid ounce');
      });
    });
  
    describe('from fluid ounce', () => {
      const weight = fluid_ounces(1);

      it('converts to gram', () => {
        const toValue = (new Big('1')).times(new Big('28.34952'));
        testConversion(weight, GRAM, toValue, new Big('28.34952'));
      });

      it('converts to ounce', () => {
        testConversion(weight, OUNCE, new Big('1'), new Big('1'));
      });

      it('convers to pound', () => {
        const toValue = (new Big('1')).div(new Big('16'));
        testConversion(weight, POUND, toValue, new Big('0.0625'));
      });

      it('converts to milligram', () => {
        const toValue = (new Big('1')).times(new Big('28349.52'));
        testConversion(weight, MILLIGRAM, toValue, new Big('28349.52'));
      });

      it('converts to kilogram', () => {
        const toValue = (new Big('1')).times(new Big('0.02834952'));
        testConversion(weight, KILOGRAM, toValue, new Big('0.02834952'));
      });

      it('does not convert to unit', () => {
        function convert() {
          weight.to(UNIT);
        }

        expect(convert).toThrow('No conversion from fluid ounce to unit');
      });

      it('converts to fluid ounce', () => {
        testConversion(weight, FLUID_OUNCE, new Big('1'), new Big('1'));
      });
    });
  });

  describe('math', () => {
    const weightUnit = units(1);
    const weightGram = grams('1.2');
    const weightOunce = ounces(1);

    describe('plus', () => {
      it('adds two like weights', () => {
        expect(weightGram.plus(weightGram)).toEqual(grams('2.4'));
      });

      it('adds two unlike weights', () => {
        expect(weightGram.plus(weightOunce)).toEqual(grams('29.54952'));
      });

      it('does not add two unlike unit types', () => {
        function addOne() {
          weightUnit.plus(weightGram);
        }

        function addTwo() {
          weightGram.plus(weightUnit);
        }

        expect(addOne).toThrow('No conversion from gram to unit');
        expect(addTwo).toThrow('No conversion from unit to gram');
      });
    });

    describe('minus', () => {
      it('subtracts two like weights', () => {
        expect(weightGram.minus(weightGram)).toEqual(grams(0));
      });

      it('subtracts two unlike weights', () => {
        expect(weightGram.minus(weightOunce)).toEqual(grams('-27.14952'));
      });

      it('does not subtract two unlike unit types', () => {
        function minusOne() {
          weightUnit.minus(weightGram);
        }

        function minusTwo() {
          weightGram.minus(weightUnit);
        }

        expect(minusOne).toThrow('No conversion from gram to unit');
        expect(minusTwo).toThrow('No conversion from unit to gram');
      });
    });

    describe('times', () => {
      it('multiplies two like weights', () => {
        expect(weightGram.times(weightGram)).toEqual(grams('1.44'))
        expect(weightUnit.times(weightUnit)).toEqual(units(1));
      });

      it('multiplies two unlike weights', () => {
        expect(weightGram.times(weightOunce)).toEqual(grams('34.019424'));
      });

      it('does not multiply unit times weight', () => {
        function multiply() {
          weightUnit.times(weightGram);
        }

        expect(multiply).toThrow('No conversion from gram to unit');
      });

      it('multiplies weight times unit', () => {
        expect(weightGram.times(weightUnit)).toEqual(grams('1.2'));
      });

      it('multiplies by a non-weight', () => {
        expect(weightGram.times(5)).toEqual(grams(6));
      });
    });

    describe('div', () => {
      it('divides two like weights', () => {
        expect(weightGram.div(weightGram)).toEqual(new Big(1));
        expect(weightUnit.div(weightUnit)).toEqual(new Big(1));
      });

      it('divides two unlike weights', () => {
        const result = weightGram.div(weightOunce);
        expect(result.round(9)).toEqual(new Big('0.042328759'));
      });

      it('does not divide unit by weight', () => {
        function divide() {
          weightUnit.div(weightGram);
        }

        expect(divide).toThrow('No conversion from gram to unit');
      });

      it('divides weight by unit', () => {
        expect(weightGram.div(weightUnit)).toEqual(grams('1.2'));
      });

      it('divides by a non-weight', () => {
        expect(weightGram.div(0.2)).toEqual(grams(6));
      });
    });
  });

  describe('round', () => {
    const value = (new Big(60)).div(new Big(34));
    const weight = grams(value);

    it('rounds the value to the specified precision', () => {
      expect(weight.round(8)).toEqual(grams('1.76470588'));
    });

    it('rounds the value to the default precision', () => {
      expect(weight.round()).toEqual(grams(2));
    });
  });

  describe('lt', () => {
    it('compares two comparable weights', () => {
      expect(units(1).lt(units(2))).toEqual(true);
      expect(units(1).lt(units(1))).toEqual(false);
      expect(units(2).lt(units(1))).toEqual(false);

      expect(grams(1).lt(ounces(1))).toEqual(true);
      expect(grams(1).lt(grams(1))).toEqual(false);
      expect(ounces(1).lt(grams(1))).toEqual(false);
    });

    it('cannot compare two unlike units', () => {
      function ltOne() {
        units(1).lt(grams(1));
      }

      function ltTwo() {
        grams(1).lt(units(1));
      }

      expect(ltOne).toThrow('No conversion from gram to unit');
      expect(ltTwo).toThrow('No conversion from unit to gram');
    });
  });

  describe('lte', () => {
    it('compares two comparable weights', () => {
      expect(units(1).lte(units(2))).toEqual(true);
      expect(units(1).lte(units(1))).toEqual(true);
      expect(units(2).lte(units(1))).toEqual(false);

      expect(grams(1).lte(ounces(1))).toEqual(true);
      expect(grams(1).lte(grams(1))).toEqual(true);
      expect(ounces(1).lte(grams(1))).toEqual(false);
    });

    it('cannot compare two unlike units', () => {
      function lteOne() {
        units(1).lte(grams(1));
      }

      function lteTwo() {
        grams(1).lte(units(1));
      }

      expect(lteOne).toThrow('No conversion from gram to unit');
      expect(lteTwo).toThrow('No conversion from unit to gram');
    });
  });

  describe('gt', () => {
    it('compares two comparable weights', () => {
      expect(units(1).gt(units(2))).toEqual(false);
      expect(units(1).gt(units(1))).toEqual(false);
      expect(units(2).gt(units(1))).toEqual(true);

      expect(grams(1).gt(ounces(1))).toEqual(false);
      expect(grams(1).gt(grams(1))).toEqual(false);
      expect(ounces(1).gt(grams(1))).toEqual(true);
    });

    it('cannot compare two unlike units', () => {
      function gtOne() {
        units(1).gt(grams(1));
      }

      function gtTwo() {
        grams(1).gt(units(1));
      }

      expect(gtOne).toThrow('No conversion from gram to unit');
      expect(gtTwo).toThrow('No conversion from unit to gram');
    });
  });

  describe('gte', () => {
    it('compares two comparable weights', () => {
      expect(units(1).gte(units(2))).toEqual(false);
      expect(units(1).gte(units(1))).toEqual(true);
      expect(units(2).gte(units(1))).toEqual(true);

      expect(grams(1).gte(ounces(1))).toEqual(false);
      expect(grams(1).gte(grams(1))).toEqual(true);
      expect(ounces(1).gte(grams(1))).toEqual(true);
    });

    it('cannot compare two unlike units', () => {
      function gteOne() {
        units(1).gte(grams(1));
      }

      function gteTwo() {
        grams(1).gte(units(1));
      }

      expect(gteOne).toThrow('No conversion from gram to unit');
      expect(gteTwo).toThrow('No conversion from unit to gram');
    });
  });

  describe('cmp', () => {
    it('compares two comparable weights', () => {
      expect(units(1).cmp(units(2))).toEqual(-1);
      expect(units(1).cmp(units(1))).toEqual(0);
      expect(units(2).cmp(units(1))).toEqual(1);

      expect(grams(1).cmp(ounces(1))).toEqual(-1);
      expect(grams(1).cmp(grams(1))).toEqual(0);
      expect(ounces(1).cmp(grams(1))).toEqual(1);
    });

    it('cannot compare two unlike units', () => {
      function cmpOne() {
        units(1).cmp(grams(1));
      }

      function cmpTwo() {
        grams(1).cmp(units(1));
      }

      expect(cmpOne).toThrow('No conversion from gram to unit');
      expect(cmpTwo).toThrow('No conversion from unit to gram');
    });
  });

  describe('eq', () => {
    it('compares two comparable weights', () => {
      expect(units(1).eq(units(2))).toEqual(false);
      expect(units(1).eq(units(1))).toEqual(true);
      expect(units(2).eq(units(1))).toEqual(false);

      expect(grams(1).eq(ounces(1))).toEqual(false);
      expect(grams(1).eq(grams(1))).toEqual(true);
      expect(ounces(1).eq(grams(1))).toEqual(false);
    });

    it('cannot compare two unlike units', () => {
      function eqOne() {
        units(1).eq(grams(1));
      }

      function eqTwo() {
        grams(1).eq(units(1));
      }

      expect(eqOne).toThrow('No conversion from gram to unit');
      expect(eqTwo).toThrow('No conversion from unit to gram');
    });
  });

  describe('toJSON', () => {
    it('returns the correct json', () => {
      expect(grams(1).toJSON()).toEqual({ value: '1', unit: GRAM });
    });
  });

  describe('isUnit', () => {
    describe('for a weight', () => {
      it('returns false', () => {
        expect(grams(1).isUnit).toEqual(false);
        expect(ounces(1).isUnit).toEqual(false);
        expect(pounds(1).isUnit).toEqual(false);
        expect(milligrams(1).isUnit).toEqual(false);
        expect(kilograms(1).isUnit).toEqual(false);
      });
    });

    describe('for a unit', () => {
      it('returns true', () => {
        expect(units(1).isUnit).toEqual(true);
      });
    });

    describe('for a volume', () => {
      it('returns false', () => {
        expect(fluid_ounces(1).isUnit).toEqual(false);
      });
    });
  });

  describe('isWeight', () => {
    describe('for a weight', () => {
      it('returns true', () => {
        expect(grams(1).isWeight).toEqual(true);
        expect(ounces(1).isWeight).toEqual(true);
        expect(pounds(1).isWeight).toEqual(true);
        expect(milligrams(1).isWeight).toEqual(true);
        expect(kilograms(1).isWeight).toEqual(true);
      });
    });

    describe('for a unit', () => {
      it('returns false', () => {
        expect(units(1).isWeight).toEqual(false);
      });
    });

    describe('for a volume', () => {
      it('returns false', () => {
        expect(fluid_ounces(1).isWeight).toEqual(false);
      });
    });
  });

  describe('isVolume', () => {
    describe('for a weight', () => {
      it('returns false', () => {
        expect(grams(1).isVolume).toEqual(false);
        expect(ounces(1).isVolume).toEqual(false);
        expect(pounds(1).isVolume).toEqual(false);
        expect(milligrams(1).isVolume).toEqual(false);
        expect(kilograms(1).isVolume).toEqual(false);
      });
    });

    describe('for a unit', () => {
      it('returns false', () => {
        expect(units(1).isVolume).toEqual(false);
      });
    });

    describe('for a volume', () => {
      it('returns true', () => {
        expect(fluid_ounces(1).isVolume).toEqual(true);
      });
    });
  });
});
