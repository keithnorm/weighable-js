# Weighable (JS)

A library for dealing with weights in Javascript.

## Installation

```
npm install --save weighable
```

OR

```
yarn add weighable
```

## Usage

Using the Weight class is as simple as:

```javascript
import { Weight, GRAM, OUNCE } from 'weighable';

let weight = new Weight(1, GRAM);
weight = weight.plus(new Weight(1, OUNCE));
weight = weight.round(4);
```

It gets even cleaner when you use the helper methods:

```javascript
import { grams, ounces } from 'weighable';

let weight = grams(1);
weight = weight.plus(ounces(1));
weight = weight.round(4);
```

## Testing

```
yarn install
yarn jest
```
