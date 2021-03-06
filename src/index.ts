// Request Animation Frame
// Tenemos que ejecutarlo y llamarlo en cada ciclo

// ----------------------------------------------------------------------------------------------
// monoide vector

import type { Monoid } from 'fp-ts/Monoid';
import { getStructMonoid } from 'fp-ts/Monoid';
import * as RA from 'fp-ts/ReadonlyArray';

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

type ColorRGBA = readonly [number, number, number, number];

// TODO creo que podríamos crear un único objeto de forma que :
/*

type Particle = {
  readonly position: Point;
  readonly color: ColorRGBA;
  readonly size: number;
  readonly mass: number;
}

 */

type Emitter = {
  readonly position: Point;
  readonly velocity: Vector; // TODO no tendría por qué tener velocidad podría ser masa
  readonly size: number;
  readonly spread: number; // TODO esto creo que tampoco debería de ir aquí ???
  readonly frequency: number;
};

type Particle = {
  readonly position: Point;
  readonly velocity: Vector; // TODO creo que esto tampoco debería de estar aquí
  readonly acceleration: Vector; // TODO creo que esto tampoco debería de estar aquí
  readonly color: ColorRGBA;
  readonly size: number;
};

type Field = {
  readonly position: Point;
  readonly size: number;
  readonly mass: number;
  readonly color: ReadonlyArray<readonly [ColorRGBA, ColorRGBA]>;
};

// ----------------------------------------------------------------------------------------------

// Tenemos estos 3 elementos y la forma de trabajar será:
/*

ESTRUCTURAS
-----------
1/ tenemos un array de particulas
2/ un array de emisores
3/ un array de campos

OPERACIONES
----------
1/ creamos partículas desde un emisor con una serie de condiciones
2/ aplicamos fuerzas gravitatorias a las partículas
3/ transformamos la partícula

*/

// como tenemos que crear estrcuturas de listas vamos a usar una mónada de listas

const particle1: Particle = {
  acceleration: { to: { x: 10, y: 10 }, from: { x: 10, y: 10 } },
  color: [255, 126, 12, 1],
  position: { x: 10, y: 20 },
  size: 2,
  velocity: { to: { x: 10, y: 10 }, from: { x: 10, y: 10 } },
};

const particle2: Particle = {
  acceleration: { to: { x: 10, y: 10 }, from: { x: 10, y: 10 } },
  color: [255, 126, 12, 1],
  position: { x: 10, y: 20 },
  size: 2,
  velocity: { to: { x: 10, y: 10 }, from: { x: 10, y: 10 } },
};

const emitter1: Emitter = {
  velocity: { to: { x: 10, y: 10 }, from: { x: 10, y: 10 } },
  position: { x: 10, y: 20 },
  frequency: 0,
  size: 0,
  spread: 0,
};

// Arrays
// ------
// TODO: No se cómo inicializar un Array de partículas vacío por eso paso una primera partícula
const particlesArray = RA.of(particle1);
// const a = RA.insertAt(0, particle2)(particlesArray); // ?

const emittersArray = RA.of(emitter1);

requestFrame(1)(console.log);
