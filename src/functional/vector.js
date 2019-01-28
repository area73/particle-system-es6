import prop from '../ramda/prop.js';
import pipe from '../ramda/pipe.js';

export const vector = (a, b) => ({ x: a, y: b });

export const hypotenuse = (x, y) => Math.sqrt(x ** 2 + y ** 2);
export const getMagnitude = vect => hypotenuse(vect.x, vect.y);

export const polarAng = vect => Math.atan2(vect.y, vect.x);
export const getAngle = polarAng;

export const copy = v => vector(v.x, v.y);

export const fromAngle = (angle, magnitude) =>
  vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));

const reduceDeg = deg => deg % 360;
const toDeg = rad => rad * (180 / Math.PI);
export const radToDeg = pipe(
  toDeg,
  reduceDeg,
);

const add = a => b => a + b;
const propX = prop('x');
const propY = prop('y');

export const addVectors = (vectorA, vectorB) =>
  vector(
    add(propX(vectorA))(propX(vectorB)),
    add(propY(vectorA))(propY(vectorB)),
  );

export const addVectors2 = vectorA => vectorB =>
  vector(
    add(propX(vectorA))(propX(vectorB)),
    add(propY(vectorA))(propY(vectorB)),
  );
