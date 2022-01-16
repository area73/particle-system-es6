import { emitter } from '../emitter.js';
import { Vector } from '../Vector.js';
import { Field } from '../Field.js';

const emitters = [
  emitter({
    position: Vector(300, 300),
    velocity: Vector(1, 0),
    spread: 2 * Math.PI,
  }),
];
const fields = [
  Field({ position: Vector(100, 100), mass: 450 }),
  Field({ position: Vector(100, 700), mass: 450 }),
  Field({ position: Vector(700, 100), mass: 450 }),
  Field({ position: Vector(700, 700), mass: 450 }),
];

export const Data = {
  emitters,
  fields,
};
