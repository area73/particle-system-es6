// Request Animation Frame
// Tenemos que ejecutarlo y llamarlo en cada ciclo

// ----------------------------------------------------------------------------------------------
// monoide vector

import type { Monoid } from 'fp-ts/Monoid';
import { getStructMonoid } from 'fp-ts/Monoid';

const loop = (count: number, ps: ParticleSystem) => {
  ps(count);
  count && requestAnimationFrame(() => loop(--count, ps));
};

type ParticleSystem = () => undefined | void;

/**
 * @callback ParticleSystem
 * @param {count | number}  count number of repetitions. If count < 0 will run infinite else will
 * decrement the loops until reach 0 and then there will be no more requestAnimationFrame
 * @return {this| undefined}
 */
/** @type {function(Function): ParticleSystem} */
const requestFrame = (count: number) => (particleSystem: ParticleSystem) =>
  requestAnimationFrame(() => loop(count, particleSystem));

type Point = {
  readonly x: number;
  readonly y: number;
};

type Vector = {
  readonly from: Point;
  readonly to: Point;
};

/** number `Monoid` under addition */
const monoidSum: Monoid<number> = {
  concat: (x, y) => x + y,
  empty: 0,
};

const monoidPoint: Monoid<Point> = getStructMonoid({
  x: monoidSum,
  y: monoidSum,
});

const monoidVector: Monoid<Vector> = getStructMonoid({
  from: monoidPoint,
  to: monoidPoint,
});

// ----------------------------------------------------------------------------------------------

requestFrame(1)(console.log);
