import {
  vector,
  hypotenuse,
  cartesianToPolar,
  copy,
  fromAngle,
  radToDeg,
} from '../../src/functional/vector';

test('get a vector', () => {
  const newVector = vector(10, 20);
  expect(newVector).toEqual({ x: 10, y: 20 });
});

test('get a hypotenuse', () => {
  const hypo = hypotenuse(7, 22);
  expect(hypo).toBe(23.08679276123039);
});

test('get a hypotenuse (edge case)', () => {
  const hypo = hypotenuse(0, 22);
  expect(hypo).toBe(22);
});

test('cartesianToPolar', () => {
  const polarAng = cartesianToPolar(10, 20);
  expect(polarAng).toBe(1.1071487177940904);
});

test('cartesianToPolar (edge)', () => {
  const polarAng = cartesianToPolar(0, 20);
  expect(polarAng).toBe(1.5707963267948966);
});

test('cartesianToPolar (edge)', () => {
  const polarAng = cartesianToPolar(20, 0);
  expect(polarAng).toBe(0);
});

test('copy', () => {
  const oldVector = vector(10, 20);
  const vectorDup = copy(oldVector);
  expect(vectorDup).toEqual({ x: 10, y: 20 });
  expect(vectorDup).not.toBe(oldVector);
});

test('fromAngle', () => {
  const vectorDup = fromAngle(10, 20);
  expect(vectorDup).toEqual({ x: -16.781430581529047, y: -10.880422217787395 });
});

test('radians to Degrees', () => {
  const deg = radToDeg(Math.PI);
  expect(deg).toBe(180);
  const deg2 = radToDeg(Math.PI / 2);
  expect(deg2).toBe(90);
  const deg3 = radToDeg((Math.PI * 3) / 2);
  expect(deg3).toBe(270);
  const deg4 = radToDeg(0);
  expect(deg4).toBe(0);
  const deg5 = radToDeg(Math.PI * 4);
  expect(deg5).toBe(0);
});
