import Particle from './Particle.js';
import Vector from './Vector.js';

let _drawColor  = "#91ff8c";
let _drawColor2 = "#081608";
let _jitter     = 0.05;

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

  static get jitter() {
    return _jitter;
  }
  static set jitter(jitter) {
    _jitter = _jitter;
  }

  static fromString(string) {
    let parts = (string.substr(1).split(':'));
    let emitter = new Emitter();
    emitter.position     = Vector.fromString(parts.shift());
    emitter.velocity     = Vector.fromString(parts.shift());
    emitter.size         = parseInt(parts.shift(),10);
    emitter.particleLife = parseInt(parts.shift(),10);
    emitter.spread       = parseFloat(parts.shift(),10);
    emitter.emissionRate = parseInt(parts.shift().valueOf(),10);
    return emitter;
  };


  constructor(point,velocity) {
    this.position     = point;
    this.velocity     = velocity;
    this.size         = 15;
    this.particleLife = -1;
    this.spread       = Math.PI / 32;
    this.emissionRate = 4;
  }
  moveTo(point) {
    this.position = point;
  };

  addParticle(){
    let particle = new Particle(
      this.position.copy(),
      Vector.fromAngle(this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2), this.velocity.getMagnitude())
    );
    particle.ttl = this.particleLife;
    return particle;
  };

  toString() {
    let coreAttributes = [
      this.position.toString(),
      this.velocity.toString(),
      this.size,
      this.particleLife,
      this.spread.toFixed(2),
      this.emissionRate
    ];
    return 'E' + coreAttributes.join(':');
  };

}








