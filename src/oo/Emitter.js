import Particle from './Particle.js';
import Vector from './Vector.js';

let _drawColor = '#91ff8c';
let _drawColor2 = '#081608';

export default class Emitter {
  static get drawColor() {
    return _drawColor;
  }

  static set drawColor(drawColor) {
    _drawColor = drawColor;
  }

  static get drawColor2() {
    return _drawColor2;
  }

  static set drawColor2(drawColor2) {
    _drawColor2 = drawColor2;
  }

  constructor(point, velocity) {
    this.position = point;
    this.velocity = velocity;
    this.size = 15;
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
