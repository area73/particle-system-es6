import ParticleSystem from '../../src/oo/ParticleSystem.js';
import EventHandler from './mock/EventHandler.mock.js';
import Display from '../../src/oo/Display.js';
import Vector from '../../src/oo/Vector.js';

const eh = EventHandler.getInstance();
const ps = new ParticleSystem(eh);

document.body.innerHTML = `<canvas id="canvas" style="background-color:black"></canvas>`;
const canvas = document.getElementById('canvas');
const disp = new Display(canvas, eh);
disp.init();
const point = new Vector(10, 20);
const velocity = new Vector(5, 7);
const mass = 240;

describe('OO :: ParticleSytem', () => {
  test(' Given an eventHandler instantiate a ParticleSystem', () => {
    expect(ps).toBeInstanceOf(ParticleSystem);
  });
  test(' given a Display init ParticleSystem', () => {
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
});
