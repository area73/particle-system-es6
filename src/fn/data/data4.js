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
  Field({ position: Vector(100, 100), mass: -100 }),
  Field({ position: Vector(100, 500), mass: -100 }),
  Field({ position: Vector(500, 100), mass: -100 }),
  Field({ position: Vector(500, 500), mass: -100 }),

  Field({ position: Vector(300, 100), mass: -100 }),
  Field({ position: Vector(500, 300), mass: -100 }),
  Field({ position: Vector(300, 500), mass: -100 }),
  Field({ position: Vector(100, 300), mass: -100 }),
];

export const Data = {
  emitters,
  fields,
};
