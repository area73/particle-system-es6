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

const calculateForce = ({ mass, position: { x, y } } = Field()) =>
  mass / (x ** 2 + y ** 2 + mass) ** 1.5;

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

Particle.isInBound = (boundry, particle) =>
  particle.position.x < boundry.x &&
  particle.position.y < boundry.y &&
  particle.position.x > 0 &&
  particle.position.y > 0;

Particle.attachToEmitter = refObj => {
  const particleOverride = {};
  const particle = Particle();
  particleOverride.position = refObj.position;
  particleOverride.velocity = Vector.fromAngle(
    Vector.polar(refObj.velocity) +
      refObj.spread -
      Math.random() * refObj.spread * 2,
    Vector.magnitude(refObj.velocity),
  );
  return { ...particle, ...particleOverride };
};
