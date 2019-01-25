// TODO::  MOVE TO UTILS
const compose = (f, g) => x => f(g(x));

export const vector = (a, b) => ({ x: a, y: b });

export const hypotenuse = (x, y) => Math.sqrt(x ** 2 + y ** 2);
export const getMagnitude = hypotenuse;

export const cartesianToPolar = (x, y) => Math.atan2(y, x);
export const getAngle = cartesianToPolar;

export const copy = v => vector(v.x, v.y);

export const fromAngle = (angle, magnitude) =>
  vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));

const reduceDeg = deg => deg % 360;
const toDeg = rad => rad * (180 / Math.PI);
export const radToDeg = compose(
  reduceDeg,
  toDeg,
);
