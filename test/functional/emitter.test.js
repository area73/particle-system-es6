import { addParticleToEmitter, emitter } from '../../src/functional/emitter';
import { particle } from '../../src/functional/particle';

test('get an emitter', () => {
  const newEmitter = emitter();
  expect(newEmitter).toEqual({
    position: { x: 0, y: 0 },
    velocity: { x: 1, y: 1 },
    size: 20,
    spread: Math.PI / 32,
    frequency: 4, // emissionRate
    color: [[0, 255, 0, 255], [0, 0, 255, 255]],
    particles: [],
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
    color: [[0, 255, 0, 255], [0, 0, 255, 255]],
    particles: [],
  });
});

test('add a particle to an emitter', () => {
  const newEmitterWithParticle = addParticleToEmitter(emitter(), particle());
  // TODO : particle.velocity is random !!!
  newEmitterWithParticle.particles[0].velocity = { x: 1, y: 1 };
  expect(newEmitterWithParticle).toEqual({
    position: { x: 0, y: 0 },
    velocity: { x: 1, y: 1 },
    size: 20,
    spread: Math.PI / 32,
    frequency: 4, // emissionRate
    color: [[0, 255, 0, 255], [0, 0, 255, 255]],
    particles: [
      {
        position: { x: 0, y: 0 },
        velocity: { x: 1, y: 1 },
        acceleration: { x: 0, y: 0 },
        color: [66, 167, 222, 255],
        size: 2,
      },
    ],
  });
});
