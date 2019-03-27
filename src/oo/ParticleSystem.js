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
  addEmitter(emitter) {
    this.emitters.push(emitter);
    this.drawEmitters();
  }

  addField(field) {
    this.fields.push(field);
    this.drawFields();
  }

  _repeat(n, fn) {
    fn();
    return n ? this._repeat(n - 1, fn) : null;
  }

  addNewParticles() {
    this.emitters.forEach(emitter => {
      // TODO [TALK] :: _repeat is a recursive fn to simulate an imperative for
      this._repeat(emitter.emissionRate, () =>
        this.particles.push(emitter.addParticle()),
      );
    });
    this.drawParticles();
  }

  // Drawing Objects
  // ---------------
  // TODO [TALK] :: composition example
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
