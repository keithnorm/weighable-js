import {
  GRAM,
  OUNCE,
  POUND,
  MILLIGRAM,
  KILOGRAM,
  UNIT,
  FLUID_OUNCE,
} from './unit';

const ABBREVIATIONS = {};
ABBREVIATIONS[GRAM] = 'g';
ABBREVIATIONS[OUNCE] = 'oz';
ABBREVIATIONS[POUND] = 'lb';
ABBREVIATIONS[MILLIGRAM] = 'mg';
ABBREVIATIONS[KILOGRAM] = 'kg';
ABBREVIATIONS[UNIT] = '';
ABBREVIATIONS[FLUID_OUNCE] = 'fl oz';

const ABBREVIATION_ALIASES = {
  'g': GRAM,
  'gram': GRAM,
  'grams': GRAM,

  'oz': OUNCE,
  'ounce': OUNCE,
  'ounces': OUNCE,

  'lb': POUND,
  'pound': POUND,
  'pounds': POUND,

  'mg': MILLIGRAM,
  'milligram': MILLIGRAM,
  'milligrams': MILLIGRAM,

  'kg': KILOGRAM,
  'kilogram': KILOGRAM,
  'kilograms': KILOGRAM,

  '': UNIT,
  'ea': UNIT,
  'each': UNIT,
  'unit': UNIT,
  'units': UNIT,
  undefined: UNIT,
  null: UNIT,

  'fl oz': FLUID_OUNCE,
  'fluid ounce': FLUID_OUNCE,
  'fluid ounces': FLUID_OUNCE,
};

export {
  ABBREVIATIONS,
  ABBREVIATION_ALIASES,
};
