import Weight from './weight';
import {
  GRAM,
  OUNCE,
  POUND,
  MILLIGRAM,
  KILOGRAM,
  UNIT,
  FLUID_OUNCE,
} from '../src/unit';

const grams = (value) => {
  return new Weight(value, GRAM);
};

const ounces = (value) => {
  return new Weight(value, OUNCE);
};

const pounds = (value) => {
  return new Weight(value, POUND);
};

const milligrams = (value) => {
  return new Weight(value, MILLIGRAM);
};

const kilograms = (value) => {
  return new Weight(value, KILOGRAM);
};

const fluid_ounces = (value) => {
  return new Weight(value, FLUID_OUNCE);
}

const units = (value) => {
  return new Weight(value, UNIT);
};

export {
  grams,
  ounces,
  pounds,
  milligrams,
  kilograms,
  units,
  fluid_ounces,
};
