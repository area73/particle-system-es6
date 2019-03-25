import Particle from './Particle.js';
import Vector from './Vector.js';

export default class Emitter {
  _backgroundColor = '#00D9FF00';

  _foregroundColor = '#ffffff70';

  get backgroundColor() {
    return this._backgroundColor;
  }

  set backgroundColor(color) {
    this._backgroundColor = color;
  }

  get foregroundColor() {
    return this._foregroundColor;
  }

  set foregroundColor(color) {
    this._foregroundColor = color;
  }

  constructor(point, velocity) {
    this.position = point;
    this.velocity = velocity;
    this.size = 60;
    this.spread = Math.PI / 32;
    this.emissionRate = 4;
  }

  addParticle() {
    return new Particle(
      this.position.copy(),
      Vector.fromAngle(
        this.velocity.getAngle() +
          this.spread -
          Math.random() * this.spread * 2,
        this.velocity.getMagnitude(),
      ),
    );
  }
}
