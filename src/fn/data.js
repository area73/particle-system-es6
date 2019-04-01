import { emitter } from './emitter.js';
import { Vector } from './Vector.js';
import { Field } from './Field.js';

const emitters = [
  emitter({
    position: Vector(200, 200),
    velocity: Vector(2, 0),
  }),
  emitter({
    position: Vector(800, 200),
    velocity: Vector(-2, 0),
  }),
];
const fields = [
  Field({ position: Vector(400, 200), mass: -100 }),
  Field({ position: Vector(500, 400), mass: 250 }),
];

export const Data = {
  emitters,
  fields,
};
