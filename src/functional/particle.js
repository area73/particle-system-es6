import {
  addVectors,
  fromAngle,
  getMagnitude,
  polarAng,
  vector,
} from './vector.js';

export const particle = ({
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





const square = x => x**2;

export const calculateForce = (mass, vectr) => {
  const a = mass / (square(vectr.x) + square(vectr.y) + mass) ** 1.5;
  const b = mass / ((square(vectr.x) + square(vectr.y)) ** 2);
  const c = - mass * 6.67** -11 / Math.sqrt(square(vectr.x) + square(vectr.y));
  //console.log(a,c)
  return a;
}


const disturbanceAcceleration = (part, fields) => {
  let totalAccelerationX = 0;
  let totalAccelerationY = 0;
  fields.forEach(field => {
    const vectorX = field.position.x - part.position.x;
    const vectorY = field.position.y - part.position.y;
    const force = calculateForce(field.mass, { x: vectorX, y: vectorY });
    totalAccelerationX += vectorX * force;
    totalAccelerationY += vectorY * force;
  });
  return vector(totalAccelerationX, totalAccelerationY);
};

// move :: a -> a
export const moveParticle = (part, fields) => {
  const { position, velocity, acceleration } = part;
  const disturbAcceleration = fields
    ? disturbanceAcceleration(part, fields)
    : acceleration;
  const newVelocity = addVectors(velocity, acceleration);
  const newPosition = addVectors(position, newVelocity);
  const updatedKeys = {
    velocity: newVelocity,
    position: newPosition,
    acceleration: disturbAcceleration,
  };
  return Object.assign(part, updatedKeys);
};

export const attachParticleToRef = (particleFn, refObj) => {
  const particleOverride = {};
  const part = particleFn();
  particleOverride.position = refObj.position;
  particleOverride.velocity = fromAngle(
    polarAng(refObj.velocity) +
      refObj.spread -
      Math.random() * refObj.spread * 2,
    getMagnitude(refObj.velocity),
  );
  return { ...part, ...particleOverride };
};
