import Emitter from './Emitter.js';
import Field from './Field.js';
import Particle from './Particle.js';
import {PSEvent} from './PSEvent.js';

export default class ParticleSystem {

  constructor(eventHandler) {
    this.particles = [];
    this.emitters = [];
    this.fields = [];
    this.display = null;
    this.eventHandler = eventHandler;
  }

  init(display) {
    this.display = display;
    this.eventHandler.addEventListener(PSEvent.update,  this.onUpdate.bind(this));
    this.eventHandler.addEventListener(PSEvent.draw, this.onDraw.bind(this));
  }
  // Adding Objects
  // --------------
  addEmitter(point, velocity) {
    let emitter = new Emitter(point, velocity);
    this.emitters.push(emitter);
    this.drawEmitters();
  }
  addField(point, mass) {
    let field = new Field(point, mass);
    this.fields.push(field);
    this.drawFields();
  }
  addNewParticles() {
    this.emitters.forEach((emitter) =>  {
      for (let i = 0; i < emitter.emissionRate; i++) {
        this.particles.push(emitter.addParticle());
      }
    });
    // console.log(this.particles.length);
    this.drawParticles();
  }
  // Drawing Objects
  // ---------------
  plotParticles(boundsX, boundsY) {
    const inBound = bound => position => (position > 0 && position < bound) ;
    const particlesInside = particles => particles.filter(particle => {
      return (inBound(boundsX)(particle.position.x) && inBound(boundsY)(particle.position.y))
    });
    const moveParticles = particles => particles.map(particle => {
      particle.submitToFields(this.fields);
      particle.move();
      return particle;
    });
    this.particles = moveParticles(particlesInside(this.particles))
  }
  drawParticles() {
    this.display.context.fillStyle = 'rgba(' + Particle.color.join(',') + ')';
    let size = Particle.size;
    this.particles.forEach((particle) =>  {
      let point = particle.position;
      this.display.context.fillRect(point.x, point.y, size, size);
    });
  }
  drawFields() {
    this.fields.forEach((field) => {
        this.drawCircularObject(field);
    });
  }
  drawEmitters() {
    this.emitters.forEach((emitter) => {
      this.drawCircularObject(emitter)
    });
  }
  drawCircularObject(object) {
    let radius = object.size >> 1;
    let gradient = this.display.context.createRadialGradient(
      object.position.x, object.position.y, object.size,
      object.position.x, object.position.y, 0,
    );
    gradient.addColorStop(0, object.drawColor || object.constructor.drawColor);
    gradient.addColorStop(1, object.drawColor2 || object.constructor.drawColor2);
    this.display.fillStyle(gradient);
    this.display.drawCircle(object.position, radius);
  }
  // Events
  // ------
  onUpdate(ev) {
    this.addNewParticles();
    this.plotParticles(this.display.width, this.display.height);

  }
  onDraw(ev) {
    this.drawParticles();
    this.drawFields();
    this.drawEmitters();
  }
}

