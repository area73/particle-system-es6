import { vector } from '../../src/functional/vector';
import {
  calculateForce,
  moveParticle,
  particle,
} from '../../src/functional/particle';
import {addParticleToEmitter, emitter} from '../../src/functional/emitter';

test('get a particle', () => {
  const newParticle = particle(
    vector(10, 20),
    vector(2, 5),
    vector(5, 5),
    0x34ff44,
    2,
  );
  expect(newParticle).toEqual({
    position: { x: 10, y: 20 },
    velocity: { x: 2, y: 5 },
    acceleration: { x: 5, y: 5 },
    color: 0x34ff44,
    size: 2,
  });
});

test('move particle', () => {
  const newParticle = particle(
    vector(10, 20), // position
    vector(2, 5), // velocity
    vector(5, 5), // acceleration
    0x34ff44,
    2,
  );

  expect(moveParticle(newParticle)).toEqual({
    position: { x: 17, y: 30 },
    velocity: { x: 7, y: 10 },
    acceleration: { x: 5, y: 5 },
    color: 0x34ff44,
    size: 2,
  });
});

test('calculate force', () => {
  const force = calculateForce(10, { x: 10, y: 20 });
  expect(force).toBe(0.0008682498877844072);
});

