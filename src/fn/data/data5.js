import { emitter } from '../emitter.js';
import { Vector } from '../Vector.js';
import { Field } from '../Field.js';

function deg2rad(degrees) {
  const pi = Math.PI;
  return degrees * (pi / 180);
}

const emitters = [
  emitter({
    position: Vector(100, 100),
    velocity: Vector(3, 3),
  }),
  emitter({
    position: Vector(600, 100),
    velocity: Vector(-3, 3),
  }),
  emitter({
    position: Vector(100, 600),
    velocity: Vector(3, -3),
  }),
  emitter({
    position: Vector(600, 600),
    velocity: Vector(-3, -3),
  }),
];
const fields = [Field({ position: Vector(350, 350), mass: -350 })];

export const Data = {
  emitters,
  fields,
};
