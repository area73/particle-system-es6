import { emitter } from '../../src/fn/emitter';
import { particle } from '../../src/fn/particle';

test('get an emitter', () => {
  const newEmitter = emitter();
  expect(newEmitter).toEqual({
    position: { x: 0, y: 0 },
    velocity: { x: 1, y: 1 },
    size: 15,
    spread: Math.PI / 32,
    frequency: 4, // emissionRate
    color: [[0, 255, 0, 1], [0, 0, 255, 1]],
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
    color: [[0, 255, 0, 1], [0, 0, 255, 1]],
  });
});
