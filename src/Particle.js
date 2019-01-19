import Vector from './Vector.js';

let _size = 2;
let _color = [66,167,222,255];
let _drawFunctions = ['Basic','Soft','Variable'];

export default class Particle {

  static get color() {
    return _color;
  }

  static set color(color) {
    _color = color;
  }

  static get size(){
    return _size;
  }

  static set size(size) {
    _size = size;
  }

  static get drawFunctions() {
    return _drawFunctions;
  }


  constructor(point, velocity) {
    this.position = point;
    this.velocity = velocity;
    this.acceleration = new Vector(0, 0);
    this.ttl = -1;
    this.lived = 0;
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

  drawVariable(pixels,width,height) {
    let baseIndex = 4 * (~~this.position.y * width + ~~this.position.x);
    let velocity = this.velocity.getMagnitude();
    let r = Particle.color[0] * velocity;
    let g = Particle.color[1];
    let b = Particle.color[2] * 0.5/velocity;
    let a = Particle.color[3];
    pixels[baseIndex]      += r;
    pixels[baseIndex + 1]  += g;
    pixels[baseIndex + 2]  += b;
    pixels[baseIndex + 3]   = a;
  }

  draw(pixels,width,height){
    this.drawBasic(pixels,width,height);
  }

  drawBasic(pixels,width,height) {
    let baseIndex = 4 * (~~this.position.y * width + ~~this.position.x);
    let r = Particle.color[0];
    let g = Particle.color[1];
    let b = Particle.color[2];
    let a = Particle.color[3];
    pixels[baseIndex]      += r;
    pixels[baseIndex + 1]  += g;
    pixels[baseIndex + 2]  += b;
    pixels[baseIndex + 3]   = a;
  }

  drawSoft(pixels,width,height) {
    let baseIndex = 4 * (~~this.position.y * width + ~~this.position.x);
    let r = Particle.color[0];
    let g = Particle.color[1];
    let b = Particle.color[2];
    let a = Particle.color[3];
    pixels[baseIndex - 4]  += r*0.80;
    pixels[baseIndex - 3]  += g*0.80;
    pixels[baseIndex - 2]  += b*0.80;
    pixels[baseIndex - 1]   = a;
    pixels[baseIndex]      += r*0.80;
    pixels[baseIndex + 1]  += g*0.80;
    pixels[baseIndex + 2]  += b*0.80;
    pixels[baseIndex + 3]   = a;
    pixels[baseIndex + 4]  += r*0.80;
    pixels[baseIndex + 5]  += g*0.80;
    pixels[baseIndex + 6]  += b*0.80;
    pixels[baseIndex + 7]   = a;
    baseIndex += width * 4;
    pixels[baseIndex - 4]  += r*0.80;
    pixels[baseIndex - 3]  += g*0.80;
    pixels[baseIndex - 2]  += b*0.80;
    pixels[baseIndex - 1]   = a;
    pixels[baseIndex]      += r;
    pixels[baseIndex + 1]  += g;
    pixels[baseIndex + 2]  += b;
    pixels[baseIndex + 3]   = a;
    pixels[baseIndex + 4]  += r*0.80;
    pixels[baseIndex + 5]  += g*0.80;
    pixels[baseIndex + 6]  += b*0.80;
    pixels[baseIndex + 7]   = a;
    baseIndex += width * 4;
    pixels[baseIndex - 4]  += r*0.80;
    pixels[baseIndex - 3]  += g*0.80;
    pixels[baseIndex - 2]  += b*0.80;
    pixels[baseIndex - 1]   = a;
    pixels[baseIndex]      += r*0.80;
    pixels[baseIndex + 1]  += g*0.80;
    pixels[baseIndex + 2]  += b*0.80;
    pixels[baseIndex + 3]   = a;
    pixels[baseIndex + 4]  += r*0.80;
    pixels[baseIndex + 5]  += g*0.80;
    pixels[baseIndex + 6]  += b*0.80;
    pixels[baseIndex + 7]   = a;
  }
}






