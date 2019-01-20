import Vector from './Vector.js';

let _size = 2;
let _color = [66,167,222,255];

export default class Particle {

  static get color() {
    return _color;
  }
  static get size(){
    return _size;
  }
  static set size(size) {
    _size = size;
  }

  constructor(point, velocity) {
    this.position = point;
    this.velocity = velocity;
    this.acceleration = new Vector(0, 0);
  }

  submitToFields(fields) {
    let totalAccelerationX = 0;
    let totalAccelerationY = 0;
    fields.forEach( (field) => {
      let vectorX = field.position.x - this.position.x;
      let vectorY = field.position.y - this.position.y;
      let force = field.mass / Math.pow((vectorX*vectorX+field.mass/2+vectorY*vectorY+field.mass/2),1.5);
      totalAccelerationX += vectorX * force;
      totalAccelerationY += vectorY * force;
    });
    this.acceleration = new Vector(totalAccelerationX,totalAccelerationY);
  }
  move() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}






