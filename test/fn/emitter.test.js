import { emitter } from '../../src/fn/emitter.js';

describe('λ :: Test emitter', () => {
  test('get an emitter', () => {
    const newEmitter = emitter();
    expect(newEmitter).toEqual({
      position: { x: 0, y: 0 },
      velocity: { x: 1, y: 1 },
      size: 15,
      spread: Math.PI / 32,
      frequency: 4, // emissionRate
      color: [[0, 217, 255, 0], [255, 255, 255, 0.439]],
    });
  });

  test('get an emitter with size = 50', () => {
    const newEmitter = emitter({ size: 50 });
    expect(newEmitter).toEqual({
      position: { x: 0, y: 0 },
      velocity: { x: 1, y: 1 },
      size: 50,
      spread: Math.PI / 32,
      frequency: 4, // emissionRate
      color: [[0, 217, 255, 0], [255, 255, 255, 0.439]],
    });
  });

  test('get new  particles from an emiiter with an emition rate of 6', () => {
    const emit = emitter({ frequency: 6 });
    const particles = emitter.addParticles(emit);
    expect(particles.length).toBe(6);
  });

  test('attach particles with different colours to emitter', () => {
    const emit = emitter({ frequency: 6 });
    const particles = emitter.addParticles(emit);
    expect(particles.length).toBe(6);
  });
});
