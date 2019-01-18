/*global define,_*/
import Vector from './Vector';
import Emitter from './Emitter';
import Field from './Field';
import Particle from './Particle';

export default class ParticleSystem {

  construsctor() {
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
  }

  addEmitter(point, velocity) {
    let emitter = new Emitter(point, velocity);
    this.emitters.push(emitter);
    // this.trigger('newObject', {particleTarget: emitter});
  }

  addField(point, mass) {
    let field = new Field(point, mass);
    this.fields.push(field);
    // this.trigger('newObject', {particleTarget: field});
  }

  addNewParticles() {
    if (this.particles.length > this.maxParticles) return;
    this.emitters.forEach(function(emitter) {
      for (let i = 0; i < this.emitter.emissionRate; i++) {
        this.particles.push(this.emitter.addParticle());
      }
    });
  }

  // TODO: remove lodash reject (similar to negative filter)
  plotParticles(boundsX, boundsY) {
    let fields = this.fields;
    this.particles = _(this.particles).reject(function(particle) {
      if (particle.ttl > 0 && ++particle.lived >= particle.ttl) return true;
      let p = particle.position;
      if (p.x < 0 || p.x > boundsX || p.y < 0 || p.y > boundsY) return true;
      particle.submitToFields(fields);
      particle.move();
    });
  }

  drawParticles() {
    //this.display.context.globalCompositeOperation = 'darker';
    this.display.context.fillStyle = 'rgba(' + Particle.color.join(',') + ')';
    let size = Particle.size;
    this.particles.forEach(function(particle) {
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
    this.fields.forEach(function(field){
        this.drawCircularObject(field);
    });
  }

  drawEmitters() {
    this.emitters.forEach(function(emitter){
      this.drawCircularObject(emitter)
    });
  }


  //////////////////////////////////////////
  init(display) {
    this.display = display;
    display.on('draw', this.onDraw, this);
    display.on('afterDraw', this.onAfterDraw, this);
    display.on('beforeUpdate', this.onBeforeUpdate, this);
    display.on('update', this.onUpdate, this);
    display.on('mouseUp', this.onMouseUp, this);
    display.on('mouseDown', this.onMouseDown, this);
    display.on('mouseMove', this.onMouseMove, this);
    return this;
  }

  onBeforeUpdate(evt) {
    if (this.draw.accelerations) this.drawAccelerations();
    if (this.draw.velocities) this.drawVelocities();
  }

  onUpdate(evt) {
    this.elapsed++;
    this.addNewParticles();
    this.plotParticles(this.display.width, this.display.height);
  }

  onDraw(evt) {
    if (this.draw.particles) this.drawParticles();
    if (this.draw.objects) {
      this.drawFields();
      this.drawEmitters();
    }
  }

  onAfterDraw(evt) {
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
    removeObject('fields');
  }
}

,
drawCircularObject: function(object) {
  var radius = object.size >> 1;
  var gradient = this.display.context.createRadialGradient(
    object.position.x, object.position.y, object.size,
    object.position.x, object.position.y, 0,
  );
  gradient.addColorStop(0, object.drawColor || object.constructor.drawColor);
  gradient.addColorStop(1, object.drawColor2 || object.constructor.drawColor2);
  this.display.fillStyle(gradient);
  this.display.drawCircle(object.position, radius);
}
,
getObjectAtPoint: function(point) {
  var objects = _([].concat(this.emitters, this.fields)).filter(function(obj) {
    return point.withinBounds(obj.position, obj.size);
  });
  return objects[0];
}
,
getParticleCount: function() { return this.particles.length; }
,
getEmitterCount: function() { return this.emitters.length; }
,
getFieldCount: function() { return this.fields.length; }
,
toString: function() {
  var stateVersion = 1;
  var coreAttributes = [
    this.maxParticles,
    this.draw.objects ? 1 : 0,
    this.draw.accelerations ? 1 : 0,
    this.draw.velocities ? 1 : 0,
    this.draw.particles ? 1 : 0,
  ];
  _(this.emitters).each(function(o) {coreAttributes.push(o.toString());});
  _(this.fields).each(function(o) {coreAttributes.push(o.toString());});
  return 'Sv' + stateVersion + '(' + coreAttributes.join('|') + ')';
}
,
// Sv#(string)
fromString: function(string) {
  var versions = {
    Sv1: this.loadStateV1,
  };
  var matches = string.match(/^([^(]+)\((.*)\)$/);
  this.particles = [];
  if (matches && matches.length === 3 && versions[matches[1]]) versions[matches[1]].apply(this, [matches[2]]);
}
,
// maxP|draw.obj|draw.acc|draw.vel|draw.part|emitter|emitter|field|field
loadStateV1: function(string) {
  var parts = string.split('|');
  this.maxParticles = parseInt(parts.shift(), 10);
  this.draw.objects = parts.shift() === '1' ? true : false;
  this.draw.accelerations = parts.shift() === '1' ? true : false;
  this.draw.velocities = parts.shift() === '1' ? true : false;
  this.draw.particles = parts.shift() === '1' ? true : false;
  this.emitters = [];
  this.fields = [];
  _(parts).each(function(objectString) {
    if (objectString.charAt(0) === 'E') this.emitters.push(Emitter.fromString(objectString));
    else this.fields.push(Field.fromString(objectString));
  }.bind(this));
}
,



