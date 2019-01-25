import { addVectors } from './vector';

export const particle = (
  position = {x:Math.random()*1000, y:Math.random()*1000},
  velocity = {x:Math.random()*10, y:Math.random()*10},
  acceleration = { x: 0, y: 0 },
  color = [66, 167, 222, 255],
  size = 2,
) => ({
  position,
  velocity,
  acceleration,
  color,
  size,
});

// move :: a -> a
export const moveParticle = part => {
  const { position, velocity, acceleration } = part;
  // const {0:pos, 1:vel , 2:acc } = evaluate(position,velocity,acceleration)(part);
  const newVelocity = addVectors(velocity, acceleration);
  const newPosition = addVectors(position, newVelocity);
  const updatedKeys = {
    velocity: newVelocity,
    position: newPosition,
  };
  return Object.assign(part, updatedKeys);
};


const calculateForce = (mass,vector) => mass / ((vector.x ** 2 + vector.y ** 2 + mass) ** 1.5)


export default class Particle {

  submitToFields(fields) {
    let totalAccelerationX = 0;
    let totalAccelerationY = 0;
    fields.forEach(field => {
      const vectorX = field.position.x - this.position.x;
      const vectorY = field.position.y - this.position.y;
      const force = Particle.calculateForce(field, vectorX, vectorY);
      totalAccelerationX += vectorX * force;
      totalAccelerationY += vectorY * force;
    });
    this.acceleration = new Vector(totalAccelerationX, totalAccelerationY);
  }
}
