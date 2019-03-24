import Particle from '../../src/oo/Particle.js';
import Vector from '../../src/oo/Vector.js';
import Field from '../../src/oo/Field.js';

const point = new Vector(10, 20);
const velocity = new Vector(1, 1);
const particle = new Particle(point, velocity);

const pointA = new Vector(12, 17);
const pointB = new Vector(34, -7);
const massA = 123;
const massB = -232;

const fieldA = new Field(pointA, massA);
const fieldB = new Field(pointB, massB);
const fields = [fieldA, fieldB];

describe('OO :: Particle', () => {
  test('Given a position and a velocity it should create a Particle', () => {
    expect(particle).toBeTruthy();
  });
  test('Static prop color as an array of 4 items', () => {
    expect(Particle.color).toBeArrayOfSize(4);
  });
  test('Static prop size as a number ', () => {
    expect(Particle.size).toBeNumber();
  });
  test('Given a field object an X value and a Y value, gets Static method to calculate force ', () => {
    const field = { mass: 300 };
    const vectorX = 100;
    const vectorY = 50;
    const force = Particle.calculateForce(field, vectorX, vectorY);
    expect(force).toBe(0.00020716018980074634);
  });
  test('[EDGE were x,y = 0]Given a field object an X value and a Y value, gets Static method to calculate force ', () => {
    const field = { mass: 300 };
    const vectorX = 0;
    const vectorY = 0;
    const force = Particle.calculateForce(field, vectorX, vectorY);
    expect(force).toBe(0.057735026918962574);
  });
  test('[EDGE were x,y, field.mass = 0]Given a field object an X value and a Y value, gets Static method to calculate force ', () => {
    const field = { mass: 0 };
    const vectorX = 0;
    const vectorY = 0;
    const force = Particle.calculateForce(field, vectorX, vectorY);
    expect(force).toBe(0);
  });
  test('obtaining Acceleration based on oarticle submitted to fields', () => {
    particle.submitToFields(fields);
    expect(particle.acceleration).toEqual({
      x: -0.0033108810039332026,
      y: -0.05443976063306208,
    });
  });
  test('move a particle with a given acceleration', () => {
    particle.submitToFields(fields);
    particle.move();
    expect(particle.velocity.x).toBe(0.9966891189960668);
    expect(particle.velocity.y).toBe(0.9455602393669379);
    expect(particle.position.x).toBe(10.996689118996066);
    expect(particle.position.y).toBe(20.945560239366937);
  });
});
