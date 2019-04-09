import {
  GRAM,
  OUNCE,
  POUND,
  MILLIGRAM,
  KILOGRAM,
  UNIT,
  FLUID_OUNCE,
} from '../src/unit';

describe('Unit', () => {
  it('knows all of the units', () => {
    expect(GRAM).toEqual(0);
    expect(OUNCE).toEqual(1);
    expect(POUND).toEqual(2);
    expect(MILLIGRAM).toEqual(3);
    expect(KILOGRAM).toEqual(4);
    expect(UNIT).toEqual(5);
    expect(FLUID_OUNCE).toEqual(6);
  });
});
