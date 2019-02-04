import { vector } from '../../src/functional/Vector';
import {
  calculateForce,
  moveParticle,
  particle,
} from '../../src/functional/particle';
import { emitter } from '../../src/functional/emitter';

test('get a particle', () => {
  const newParticle = particle({
    position: vector(10, 20),
    velocity: vector(2, 5),
    acceleration: vector(5, 5),
    color: [255, 255, 255, 1],
    size: 2,
  });
  expect(newParticle).toEqual({
    position: { x: 10, y: 20 },
    velocity: { x: 2, y: 5 },
    acceleration: { x: 5, y: 5 },
    color: [255, 255, 255, 1],
    size: 2,
  });
});

test('move particle', () => {
  const newParticle = particle({
    position: vector(10, 20), // position
    velocity: vector(2, 5), // velocity
    acceleration: vector(5, 5), // acceleration
    color: [255, 255, 255, 1],
    size: 2,
  });

  expect(moveParticle(newParticle)).toEqual({
    position: { x: 17, y: 30 },
    velocity: { x: 7, y: 10 },
    acceleration: { x: 5, y: 5 },
    color: [255, 255, 255, 1],
    size: 2,
  });
});

test('calculate force', () => {
  const force = calculateForce(10, { x: 10, y: 20 });
  expect(force).toBe(0.0008682498877844072);
});
