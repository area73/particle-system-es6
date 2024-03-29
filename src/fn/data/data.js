import { emitter } from '../emitter.js';
import { Vector } from '../Vector.js';
import { Field } from '../Field.js';

const emitters = [
  emitter({
    position: Vector(200, 200),
    velocity: Vector(1, 0),
    spread: Math.PI / 2,
  }),
  // TODO:: referential transparency above
  emitter({
    position: Vector(800, 200),
    velocity: Vector(-2, 0),
  }),
];
const fields = [
  Field({ position: Vector(400, 200), mass: -50 }),
  Field({ position: Vector(350, 500), mass: -100 }),
];

export const Data = {
  emitters,
  fields,
};
