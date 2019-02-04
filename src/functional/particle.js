import * as R from '../ramda';

import { Field } from './Field.js';
import { Vector } from './Vector.js';

export const Particle = ({
  position = { x: Math.random() * 1000, y: Math.random() * 1000 },
  velocity = { x: Math.random() * 10, y: Math.random() * 10 },
  acceleration = { x: 0, y: 0 },
  color = [66, 167, 222, 1],
  size = 2,
} = {}) => ({
  position,
  velocity,
  acceleration,
  color,
  size,
});

const position = item => R.prop('position', item) || 0;
const posX = item => R.prop('x', position(item)) || 0;
const posY = item => R.prop('y', position(item)) || 0;
const propMass = item => R.prop('mass', item) || 0;

const calculateForce = ({ mass, position: { x, y } } = Field()) =>
  mass / (x ** 2 + y ** 2 + mass) ** 1.5;

const difference = a => b => a - b;

Particle.disturbanceAcceleration = (origin, fields) => {
  const partX = posX(origin);
  const partY = posY(origin);
  return fields.reduce((acc, curr) => {
    const fieldX = difference(posX(curr))(partX);
    const fieldY = difference(posY(curr))(partY);
    const force = calculateForce({
      mass: propMass(curr),
      position: Vector(fieldX, fieldY),
    });
    const newVector = Vector(fieldX * force, fieldY * force);
    return Vector.add(acc, newVector);
  }, Vector(0, 0));
};

// move :: a -> a
Particle.move = (part, fields) => {
  const { position, velocity, acceleration } = part;
  const disturbAcceleration = fields
    ? Particle.disturbanceAcceleration(part, fields)
    : acceleration;
  const newVelocity = Vector.add(velocity, acceleration);
  const newPosition = Vector.add(position, newVelocity);
  const updatedKeys = {
    velocity: newVelocity,
    position: newPosition,
    acceleration: disturbAcceleration,
  };
  return Object.assign(part, updatedKeys);
};

Particle.attachToField = (particleFn, refObj) => {
  const particleOverride = {};
  const part = particleFn();
  particleOverride.position = refObj.position;
  particleOverride.velocity = Vector.fromAngle(
    Vector.polar(refObj.velocity) +
      refObj.spread -
      Math.random() * refObj.spread * 2,
    Vector.magnitude(refObj.velocity),
  );
  return { ...part, ...particleOverride };
};
