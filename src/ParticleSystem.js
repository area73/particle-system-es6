import Vector from './Vector.js';
import Emitter from './Emitter.js';
import Field from './Field.js';
import Particle from './Particle.js';
import {PSEvent} from './PSEvent.js';

export default class ParticleSystem {

  constructor(eventHandler) {

    this.maxParticles = 2000;
    this.draw = {
      objects: true,
      info: true,
      accelerations: false,
      velocities: false,
      particles: true,
    };
    this.particles = [];
    this.emitters = [];
    this.fields = [];
    this.elapsed = 0;
    this.mouseCoords = new Vector(0, 0);
    this.mouseFieldStrength = -140;
    this.mouseField = null;
    this.display = null;
    this.eventHandler = eventHandler;
  }

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
    if (this.particles.length > this.maxParticles) return;
    this.emitters.forEach((emitter) =>  {
      for (let i = 0; i < emitter.emissionRate; i++) {
        this.particles.push(emitter.addParticle());
      }
    });
    this.drawParticles();
  }

  // TODO: remove lodash reject (similar to negative filter)
  plotParticles(boundsX, boundsY) {
    const inBound = bound => position => (position > 0 || position < bound) ;
    const particlesInside = particles => particles.filter(particle => {
      // debugger;
      return particle.ttl < 0
        && ++particle.lived >= particle.ttl
        && (inBound(boundsX)(particle.position.x) || inBound(boundsY)(particle.position.y))
    });
    const moveParticles = particles => particles.map(particle => {
      particle.submitToFields(this.fields);
      particle.move();
      return particle;
    });


    this.particles = moveParticles(particlesInside(this.particles))
  }

  drawParticles() {
    //this.display.context.globalCompositeOperation = 'darker';
    this.display.context.fillStyle = 'rgba(' + Particle.color.join(',') + ')';
    let size = Particle.size;
    this.particles.forEach((particle) =>  {
      let point = particle.position;
      this.display.context.fillRect(point.x, point.y, size, size);
    });
  }

  drawAccelerations() {
    this.display.strokeStyle('red');
    this.display.context.beginPath();
    this.particles.forEach(function(particle) {
      this.display.context.moveTo(particle.position.x, particle.position.y);
      this.display.context.lineTo(particle.position.x + particle.acceleration.x, particle.position.y + particle.acceleration.y);
    });
    this.display.context.stroke();
  };
  // TODO: REFACTOR, drawAccelerations & drawVelocities are almost identical
  drawVelocities() {
    this.display.strokeStyle('blue');
    this.display.context.beginPath();
    this.particles.forEach(function(particle) {
      this.display.context.moveTo(particle.position.x, particle.position.y);
      this.display.context.lineTo(particle.position.x + particle.velocity.x, particle.position.y + particle.velocity.y);
    });
    this.display.context.stroke();
  }

  // TODO: REFACTOR drawFields & drawEmitters
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
  // TODO:
  getObjectAtPoint(point) {
    var objects = _([].concat(this.emitters, this.fields)).filter(function(obj) {
      return point.withinBounds(obj.position, obj.size);
    });
    return objects[0];
  }

  getParticleCount() {
    return this.particles.length;
  }

  getEmitterCount() {
    return this.emitters.length;
  }

  getFieldCount() {
    return this.fields.length;
  }

  toString() {
    let stateVersion = 1;
    let coreAttributes = [
      this.maxParticles,
      this.draw.objects ? 1 : 0,
      this.draw.accelerations ? 1 : 0,
      this.draw.velocities ? 1 : 0,
      this.draw.particles ? 1 : 0,
    ];
    this.emitters.forEach(function(o) {coreAttributes.push(o.toString());});
    this.fields.forEach(function(o) {coreAttributes.push(o.toString());});
    return 'Sv' + stateVersion + '(' + coreAttributes.join('|') + ')';
  }

  fromString(str) {
    let versions = {
      Sv1: this.loadStateV1,
    };
    let matches = str.match(/^([^(]+)\((.*)\)$/);
    this.particles = [];
    if (matches && matches.length === 3 && versions[matches[1]]) versions[matches[1]].apply(this, [matches[2]]);
  }

  loadStateV1(string) {
    let parts = string.split('|');
    this.maxParticles = parseInt(parts.shift(), 10);
    this.draw.objects = parts.shift() === '1';
    this.draw.accelerations = parts.shift() === '1';
    this.draw.velocities = parts.shift() === '1';
    this.draw.particles = parts.shift() === '1';
    this.emitters = [];
    this.fields = [];
    parts.forEach(function(objectString) {
      if (objectString.charAt(0) === 'E') {
        this.emitters.push(Emitter.fromString(objectString));
      } else {
        this.fields.push(Field.fromString(objectString));
      }
    });
  }

  //////////////////////////////////////////
  init(display) {
    this.display = display;
    this.eventHandler.addEventListener(PSEvent.beforeUpdate,this.onBeforeUpdate.bind(this));
    this.eventHandler.addEventListener(PSEvent.update,  this.onUpdate.bind(this));
    this.eventHandler.addEventListener(PSEvent.draw, this.onDraw.bind(this));
    this.eventHandler.addEventListener(PSEvent.afterUpdate, this.onAfterDraw.bind(this));
    /*
    display.on('mouseUp', this.onMouseUp, this);
    display.on('mouseDown', this.onMouseDown, this);
    display.on('mouseMove', this.onMouseMove, this);
    */
    return this;
  }

  onBeforeUpdate(ev) {
    // console.log('onBeforeUpdate');
    this.draw.accelerations && this.drawAccelerations();
    this.draw.velocities && this.drawVelocities();
  }

  onUpdate(ev) {
    // console.log('onUpdate');
    this.elapsed++;
    this.addNewParticles();
    this.plotParticles(this.display.width, this.display.height);

  }

  drawFieldsAndEmitters() {
    this.drawFields();
    this.drawEmitters();
  }

  onDraw(ev) {
    // console.log('onDraw');
    this.draw.particles && this.drawParticles();
    this.draw.objects && this.drawFieldsAndEmitters();
  }

  onAfterDraw(ev) {
    // console.log('onAfterDraw')
    if (this.display.draw.info) {
      this.display.fillStyle('white');
      this.display.drawText('Particles : ' + this.getParticleCount(), new Vector(100, this.display.height - 10), 100);
    }
  }

  onMouseDown(evt) {
    var object = this.getObjectAtPoint(this.mouseCoords);
    if (this.selected) {
      evt.particleTarget = this.selected;
      this.trigger('objectBlur', evt);
      this.selected = undefined;
    }
    if (object) {
      this.clicked = object;
      evt.particleTarget = object;
      this.trigger('objectMouseDown');
    } else {
      this.mouseField = new Field(this.mouseCoords, this.mouseFieldStrength);
      this.mouseField.size = 0;
      this.fields.push(this.mouseField);
    }
  }

  onMouseUp(evt) {
    var currentObject = this.getObjectAtPoint(this.mouseCoords);
    if (this.mouseField) {
      this.removeField(this.mouseField);
      this.mouseField = undefined;
    } else if (this.clicked) {
      evt.particleTarget = this.clicked;
      if (currentObject === this.clicked) {
        if (this.clicked.moved) {
          this.trigger('objectFinishMove', evt);
        } else {
          this.selected = this.clicked;
          this.trigger('objectClick', evt);
          this.trigger('objectFocus', evt);
        }
        delete this.clicked.moved;
        this.clicked = undefined;
      }
    }
  }

  onMouseMove(evt) {
    this.mouseCoords = new Vector(evt.offsetX || (evt.layerX - this.display.canvas.offsetLeft), evt.offsetY || (evt.layerY - this.display.canvas.offsetTop));
    if (this.mouseField) {
      this.mouseField.moveTo(this.mouseCoords);
    } else if (this.clicked) {
      this.clicked.moved = true;
      this.clicked.moveTo(this.mouseCoords);
    } else { // not over anything
      var object = this.getObjectAtPoint(this.mouseCoords);
      if (this.objectMouseOver !== object) { // if we're over something different
        if (this.objectMouseOver) {         // if we were over something before
          evt.particleTarget = this.objectMouseOver;
          this.trigger('objectMouseOut', evt);
          this.objectMouseOver = undefined;
        } else {                            // we're in *something* new, even if it's nothing
          evt.particleTarget = object;
          this.trigger('objectMouseIn', evt);
          this.objectMouseOver = object;
        }
      }
    }
  }

  removeObject(type) {
    return function(index) {
      if (typeof index.constructor !== Number) {
        index = this[type].indexOf(index);
      }
      let object = this[type].splice(index, 1);
      object && this.trigger('deleteObject', {particleTarget: object});
    };
  }

  removeEmitter(obj) {
    this.removeObject('emitters');
  }

  removeField(obj) {
    this.removeObject('fields');
  }
}

