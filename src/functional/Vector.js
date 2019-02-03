import * as R from '../ramda';

export const Vector = (x = 0, y = 0) => ({ x, y });

Vector.magnitude = (v = Vector()) => Math.sqrt(v.x ** 2 + v.y ** 2);
Vector.polar = (v = Vector()) => Math.atan2(v.y, v.x);
Vector.copy = (v = Vector()) => Vector(v.x, v.y);
Vector.add = (a = Vector(), b = Vector()) => Vector(a.x + b.x, a.y + b.y);
Vector.fromAngle = (angle = 0, magnitude = 0) =>
  Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
Vector.scale = ({ x, y } = Vector(), k = 1) => Vector(x * k, y * k);
Vector.difference = (a = Vector(), b = Vector()) =>
  Vector(a.x - b.x, a.y - b.y);
