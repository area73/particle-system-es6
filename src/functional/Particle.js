import Vector from './vector.js';

const _size = 2;
const _color = [66, 167, 222, 255];

export default class Particle {
  static get color() {
    return _color;
  }

  static get size() {
    return _size;
  }

  static calculateForce(field, vectorX, vectorY) {
    const { mass } = field;
    const calc = vectorX ** 2 + vectorY ** 2 + mass;
    return mass / calc ** 1.5;
  }

  constructor(point, velocity) {
    this.position = point;
    this.velocity = velocity;
    this.acceleration = new Vector(0, 0);
  }

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

  move() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
