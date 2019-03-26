import ParticleSystem from '../../src/oo/ParticleSystem.js';
import EventHandler from './mock/EventHandler.mock.js';
import Display from '../../src/oo/Display.js';
import Vector from '../../src/oo/Vector.js';
import Particle from '../../src/oo/Particle.js';
import Emitter from '../../src/oo/Emitter.js';
import Field from '../../src/oo/Field.js';

const eh = EventHandler.getInstance();
const ps = new ParticleSystem(eh);

document.body.innerHTML = `<canvas id="canvas" style="background-color:black"></canvas>`;
const canvas = document.getElementById('canvas');
const disp = new Display(canvas, eh);
disp._init();
const point = new Vector(10, 20);
const velocity = new Vector(5, 7);
const mass = 240;

const particleA = new Particle(new Vector(1, 1), new Vector(1, 1));
const particleB = new Particle(new Vector(0, 1), new Vector(1, 1));
const particleC = new Particle(new Vector(1, 2), new Vector(1, 1));
const particleD = new Particle(new Vector(0, 0), new Vector(1, 1));

describe('OO :: ParticleSytem', () => {
  test(' Given an eventHandler instantiate a ParticleSystem', () => {
    expect(ps).toBeInstanceOf(ParticleSystem);
  });
  test(' given a Display _init ParticleSystem', () => {
    ps.init(disp);
    expect(ps.display).not.toBeNull();
  });
  test(' Can add an emitter to ParticleSystem', () => {
    ps.init(disp);
    ps.addEmitter(point, velocity);
    expect(ps.emitters.length > 0).toBeTrue();
  });

  test(' Can add a field to ParticleSystem', () => {
    ps.init(disp);
    ps.addField(point, mass);
    expect(ps.fields.length > 0).toBeTrue();
  });

  test(' Can add a new particles (to emitters) to ParticleSystem', () => {
    ps.init(disp);
    ps.addEmitter(point, velocity);
    ps.addNewParticles();
    expect(ps.particles.length > 0).toBeTrue();
  });
  test(' Will return a subgroup of particles to be plot within a boundry in a ParticleSystem', () => {
    ps.init(disp);
    ps.addEmitter(point, velocity);
    ps.particles = [particleA, particleB, particleC, particleD];
    ps.plotParticles(2, 2);
    expect(ps.particles.length).toBe(1);
  });
  // TODO : improve testing
  test(' Will draw particles ParticleSystem', () => {
    ps.init(disp);
    ps.addEmitter(point, velocity);
    ps.particles = [particleA, particleB, particleC, particleD];
    ps.drawParticles();
    expect(ps).toBeInstanceOf(ParticleSystem);
  });
  // TODO : improve testing
  test(' Will draw fields in a ParticleSystem', () => {
    ps.init(disp);
    ps.addEmitter(point, velocity);
    ps.particles = [particleA, particleB, particleC, particleD];
    ps.drawFields();
    expect(ps).toBeInstanceOf(ParticleSystem);
  });
  // TODO : improve testing
  test(' Will draw emitters in a ParticleSystem', () => {
    ps.init(disp);
    ps.addEmitter(point, velocity);
    ps.particles = [particleA, particleB, particleC, particleD];
    ps.drawEmitters();
    expect(ps).toBeInstanceOf(ParticleSystem);
  });
  test(' Will draw drawCircularObject (Emitter) in a ParticleSystem', () => {
    ps.init(disp);
    const obj = new Emitter(point, mass);
    ps.drawCircularObject(obj);
    expect(ps).toBeInstanceOf(ParticleSystem);
  });

  test(' Will draw drawCircularObject (field) in a ParticleSystem', () => {
    ps.init(disp);
    const obj = new Field(point, mass);
    ps.drawCircularObject(obj);
    expect(ps).toBeInstanceOf(ParticleSystem);
  });

  test(' execute events in a ParticleSystem', () => {
    ps.init(disp);
    ps.onUpdate();
    ps.onDraw();
    expect(ps).toBeInstanceOf(ParticleSystem);
  });
});
