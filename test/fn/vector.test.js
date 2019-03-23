import { Vector } from '../../src/fn/Vector';

test('get a vector', () => {
  const newVector = Vector(10, 20);
  expect(newVector).toEqual({ x: 10, y: 20 });
});

test('get a magnitude', () => {
  const magnitude = Vector.magnitude(Vector(7, 22));
  expect(magnitude).toBe(23.08679276123039);
});

test('get a magnitude (edge case)', () => {
  const magnitude = Vector.magnitude(Vector(0, 22));
  expect(magnitude).toBe(22);
});

test('get Polar angle of a vector', () => {
  const ang = Vector.polar({ x: 10, y: 20 });
  expect(ang).toBe(1.1071487177940904);
});

test('get Polar angle of a vector (edge)', () => {
  const ang = Vector.polar({ x: 0, y: 20 });
  expect(ang).toBe(1.5707963267948966);
});

test('get Polar angle of a vector (edge)', () => {
  const ang = Vector.polar({ x: 20, y: 0 });
  expect(ang).toBe(0);
});

test('copy a vector', () => {
  const oldVector = Vector(10, 20);
  const vectorDup = Vector.copy(oldVector);
  expect(vectorDup).toEqual({ x: 10, y: 20 });
  expect(vectorDup).not.toBe(oldVector);
});

test('add two vectors', () => {
  const vectorA = Vector(10, 20);
  const vectorB = Vector(5, 3);
  const addition = Vector.add(vectorA, vectorB);
  expect(addition).toEqual({ x: 15, y: 23 });
});

test('get vector from  angle and magnitude', () => {
  const vectorDup = Vector.fromAngle(10, 20);
  expect(vectorDup).toEqual({ x: -16.781430581529047, y: -10.880422217787395 });
});

test('scale a vector by a constant', () => {
  const vectorScaled = Vector.scale(Vector(10, 20), 5);
  expect(vectorScaled).toEqual({ x: 50, y: 100 });
});

test('substract vectors', () => {
  const vectorA = Vector(10, 20);
  const vectorB = Vector(5, 3);
  const substraction = Vector.difference(vectorA, vectorB);
  expect(substraction).toEqual({ x: 5, y: 17 });
});
