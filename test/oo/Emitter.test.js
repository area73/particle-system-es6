import Emitter from '../../src/oo/Emitter.js';
import Vector from '../../src/oo/Vector.js';
import Particle from '../../src/oo/Particle.js';

const point = new Vector(12, -2);
const velocity = new Vector(-5, -10);
const emitter = new Emitter(point, velocity);

describe('OO :: Emitter', () => {
  test(' Given a point an a velocity instantiate an Emitter Object', () => {
    expect(emitter).toBeObject();
  });
  test('Checks position of emitter object ', () => {
    expect(emitter.position).toBeInstanceOf(Vector);
    expect(emitter.position).toEqual(point);
  });
  test('Checks velocity of emitter object ', () => {
    expect(emitter.velocity).toBeInstanceOf(Vector);
    expect(emitter.velocity).toEqual(velocity);
  });
  test('Checks size of emitter object ', () => {
    expect(emitter.size).toBeNumber();
  });
  test('Checks spread of emitter object ', () => {
    expect(emitter.spread).toBeNumber();
  });
  test('Checks emissionRate of emitter object ', () => {
    expect(emitter.emissionRate).toBeNumber();
  });
  test('Adds a particle to the emitter', () => {
    expect(emitter.addParticle()).toBeInstanceOf(Particle);
  });
  test('get/set  method backgroundColor', () => {
    const initialColor = emitter.backgroundColor;
    expect(initialColor).toBeString();
    expect(initialColor).toStartWith('#');
    emitter.backgroundColor = initialColor === '#000' ? '#FFF' : '#000';
    expect(initialColor).not.toBe(emitter.backgroundColor);
  });
  test('get/set static method foregroundColor', () => {
    const initialColor = emitter.foregroundColor;
    expect(initialColor).toBeString();
    expect(initialColor).toStartWith('#');
    emitter.foregroundColor = initialColor === '#000' ? '#FFF' : '#000';
    expect(initialColor).not.toBe(emitter.foregroundColor);
  });
});
