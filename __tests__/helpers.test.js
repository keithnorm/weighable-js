import Big from 'big.js';
import Weight from '../src/weight';
import {
  GRAM,
  OUNCE,
  POUND,
  MILLIGRAM,
  KILOGRAM,
  UNIT,
  FLUID_OUNCE,
} from '../src/unit';
import {
  grams,
  ounces,
  pounds,
  milligrams,
  kilograms,
  units,
  fluid_ounces,
} from '../src/helpers';

describe('grams', () => {
  it('creates a weight', () => {
    const weight = grams(2.33);

    expect(weight.value).toEqual(new Big(2.33));
    expect(weight.unit).toEqual(GRAM);
  });
});

describe('ounces', () => {
  it('creates a weight', () => {
    const weight = ounces(2.33);

    expect(weight.value).toEqual(new Big(2.33));
    expect(weight.unit).toEqual(OUNCE);
  });
});

describe('pounds', () => {
  it('creates a weight', () => {
    const weight = pounds(2.33);

    expect(weight.value).toEqual(new Big(2.33));
    expect(weight.unit).toEqual(POUND);
  });
});

describe('milligrams', () => {
  it('creates a weight', () => {
    const weight = milligrams(2.33);

    expect(weight.value).toEqual(new Big(2.33));
    expect(weight.unit).toEqual(MILLIGRAM);
  });
});

describe('kilograms', () => {
  it('creates a weight', () => {
    const weight = kilograms(2.33);

    expect(weight.value).toEqual(new Big(2.33));
    expect(weight.unit).toEqual(KILOGRAM);
  });
});

describe('units', () => {
  it('creates a weight', () => {
    const weight = units(2.33);

    expect(weight.value).toEqual(new Big(2.33));
    expect(weight.unit).toEqual(UNIT);
  });
});

describe('fluid ounces', () => {
  it('creates a weight', () => {
    const weight = fluid_ounces(2.33);

    expect(weight.value).toEqual(new Big(2.33));
    expect(weight.unit).toEqual(FLUID_OUNCE);
  });
});
