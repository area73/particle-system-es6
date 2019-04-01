import { Vector } from '../../src/fn/Vector';
import { Particle } from '../../src/fn/particle.js';
import { Field } from '../../src/fn/Field.js';

describe('λ :: Test Particle', () => {
  test('get a particle', () => {
    const newParticle = Particle({
      position: Vector(10, 20),
      velocity: Vector(2, 5),
      acceleration: Vector(5, 5),
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

  test('calculate particle disturbance acceleration affected by other fields', () => {
    const originParticle = Particle({
      position: Vector(200, 200),
      velocity: Vector(1.9984222464379313, -0.07942622326393424),
      acceleration: Vector(0, 0),
      color: [255, 255, 255, 1],
      size: 2,
    });
    const fields = [
      Field(),
      Field({ position: { x: 10, y: 20 }, size: 8 }),
      Field({ position: { x: 20, y: 5 }, mass: 8 }),
    ];
    const affectedParticle = Particle.disturbanceAcceleration(
      originParticle,
      fields,
    );
    expect(affectedParticle).toEqual({
      x: 0.00866945795128943,
      y: 0.00841203542806136,
    });
  });

  test('calculate particle disturbance acceleration affected by other fields, edge case were no acceleration is been affected', () => {
    const originParticle = Particle({
      position: Vector(10, 20), // position
      velocity: Vector(2, 5), // velocity
      acceleration: Vector(5, 5), // acceleration
      color: [255, 255, 255, 1],
      size: 2,
    });
    const fields = [
      Field(),
      Field({ position: { x: 10, y: 20 }, size: 8 }),
      Field({ position: { x: 20, y: 5 }, mass: 8 }),
    ];
    const affectedParticle = Particle.disturbanceAcceleration(
      originParticle,
      fields,
    );
    expect(affectedParticle).toEqual({
      x: 0.4161463946262754,
      y: 0.7845032338854542,
    });
  });

  test('move particle', () => {
    const newParticle = Particle({
      position: Vector(10, 20), // position
      velocity: Vector(2, 5), // velocity
      acceleration: Vector(5, 5), // acceleration
      color: [255, 255, 255, 1],
      size: 2,
    });

    expect(Particle.move(newParticle)).toEqual({
      position: { x: 17, y: 30 },
      velocity: { x: 7, y: 10 },
      acceleration: { x: 5, y: 5 },
      color: [255, 255, 255, 1],
      size: 2,
    });
  });

  test('particle is in bound', () => {
    const boundary = Vector(10, 10);
    const particleIn = Particle({ position: { x: 1, y: 1 } });
    const particleOut = Particle({ position: { x: 11, y: 1 } });
    expect(Particle.isInBound(boundary, particleIn)).toBeTruthy();
    expect(Particle.isInBound(boundary, particleOut)).not.toBeTruthy();
  });
});
