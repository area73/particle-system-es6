import { emitter } from '../emitter.js';
import { Vector } from '../Vector.js';
import { Field } from '../Field.js';

const emitters = [
  emitter({
    position: Vector(225, 100),
    velocity: Vector(0, 2),
  }),
];
const fields = [
  Field({ position: Vector(300, 300), mass: -100 }),
  Field({ position: Vector(200, 500), mass: 200 }),
  Field({ position: Vector(300, 800), mass: -300 }),
];

export const Data = {
  emitters,
  fields,
};
