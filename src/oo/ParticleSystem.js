import Emitter from './Emitter.js';
import Field from './Field.js';
import Particle from './Particle.js';
import { PSEvent } from './PSEvent.js';

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
    this.eventHandler.addEventListener(
      PSEvent.update,
      this.onUpdate.bind(this),
    );
    this.eventHandler.addEventListener(PSEvent.draw, this.onDraw.bind(this));
  }

  // Adding Objects
  // --------------
  // TODO :: FIX  mejor pasar el emitter y no instanciarlo dentro del método
  addEmitter(point, velocity) {
    const emitter = new Emitter(point, velocity);
    this.emitters.push(emitter);
    this.drawEmitters();
  }

  // TODO :: FIX  mejor pasar el emitter y no instanciarlo dentro del método
  addField(point, mass) {
    const field = new Field(point, mass);
    this.fields.push(field);
    this.drawFields();
  }

  addNewParticles() {
    this.emitters.forEach(emitter => {
      for (let i = 0; i < emitter.emissionRate; i += 1) {
        this.particles.push(emitter.addParticle());
      }
    });
    this.drawParticles();
  }

  // Drawing Objects
  // ---------------
  // TODO [TALK] :: ejemplo de composición
  // TODO [TALK] :: moveParticles(particlesInside(this.particles))
  plotParticles(boundsX, boundsY) {
    const inBound = bound => position => position > 0 && position < bound;
    const particlesInside = particles =>
      particles.filter(particle => {
        return (
          inBound(boundsX)(particle.position.x) &&
          inBound(boundsY)(particle.position.y)
        );
      });
    const moveParticles = particles =>
      particles.map(particle => {
        particle.submitToFields(this.fields);
        particle.move();
        return particle;
      });
    this.particles = moveParticles(particlesInside(this.particles));
  }

  drawParticles() {
    this.display.context.fillStyle = `rgba(${Particle.color.join(',')})`;
    // eslint-disable-next-line prefer-destructuring
    const size = Particle.size;
    this.particles.forEach(particle => {
      const point = particle.position;
      this.display.context.fillRect(point.x, point.y, size, size);
    });
  }

  drawFields() {
    this.fields.forEach(field => {
      this.drawCircularObject(field);
    });
  }

  drawEmitters() {
    this.emitters.forEach(emitter => {
      this.drawCircularObject(emitter);
    });
  }

  drawCircularObject(object) {
    const radius = object.size >> 1;
    const gradient = this.display.context.createRadialGradient(
      object.position.x,
      object.position.y,
      object.size / 2,
      object.position.x,
      object.position.y,
      0,
    );
    gradient.addColorStop(0, object.backgroundColor);
    gradient.addColorStop(1, object.foregroundColor);

    this.display.fillStyle(gradient);
    this.display.drawCircle(object.position, radius);
  }

  // Events
  // ------
  onUpdate(/* ev */) {
    this.addNewParticles();
    this.plotParticles(this.display.width, this.display.height);
  }

  onDraw(/* ev */) {
    this.drawParticles();
    this.drawFields();
    this.drawEmitters();
  }
}
