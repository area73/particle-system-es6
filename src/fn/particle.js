import { Field } from './Field.js';
import { Vector } from './Vector.js';

export const Particle = ({
  position = { x: Math.random() * 1000, y: Math.random() * 1000 },
  velocity = { x: Math.random() * 10 - 5, y: Math.random() * 10 - 5 },
  acceleration = { x: 0, y: 0 },
  color = [66, 167, 222, 1],
  size = 1,
} = {}) => ({
  position,
  velocity,
  acceleration,
  color,
  size,
});

const calculateForce = ({ mass, position } = Field()) => {
  const force = mass / Vector.magnitude(position) ** 3;
  return isFinite(force) ? force : 0;
};

Particle.disturbanceAcceleration = (origin, fields = []) =>
  fields.reduce((acc, { mass, position }) => {
    const newPos = Vector.difference(position, origin.position);
    const force = calculateForce(Field({ mass, position: newPos }));
    return Vector.add(acc, Vector.scale(newPos, force));
  }, Vector());

// move :: a -> a
Particle.move = (origin, fields) => {
  const { position, velocity, acceleration } = origin;
  const disturbAcceleration = fields
    ? Particle.disturbanceAcceleration(origin, fields)
    : acceleration;
  const newVelocity = Vector.add(velocity, disturbAcceleration);
  const newPosition = Vector.add(position, newVelocity);
  const updatedKeys = {
    velocity: newVelocity,
    position: newPosition,
    acceleration: disturbAcceleration,
  };
  return { ...origin, ...updatedKeys };
};

Particle.isInBound = (boundary, particle) =>
  particle.position.x < boundary.x &&
  particle.position.y < boundary.y &&
  particle.position.x > 0 &&
  particle.position.y > 0;

// [TALK] we need to add a particle with difernet color each time, so maybe
// [TALK] we should change this function and make it more extensible
Particle.attachToEmitter = (emitterRef, customParticle) => {
  const particleOverride = {};
  const particle = customParticle || Particle();
  particleOverride.position = emitterRef.position;
  particleOverride.velocity = Vector.fromAngle(
    Vector.polar(emitterRef.velocity) +
      emitterRef.spread -
      Math.random() * emitterRef.spread * 2,
    Vector.magnitude(emitterRef.velocity),
  );
  return { ...particle, ...particleOverride };
};
