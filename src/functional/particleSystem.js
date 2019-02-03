import {
  circleGradiantDraw,
  Display,
  clearCtx,
  squaredDraw,
} from './display.js';
import { emitter } from './emitter.js';
import { Particle } from './particle.js';
import { Field } from './Field.js';
import * as R from '../ramda';
import { Vector } from './Vector.js';

// Display
// -------
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const disp = Display(canvas);

// Emitters
// --------
const emitterA = emitter({
  position: Vector(200, 200),
  velocity: Vector(2, 0),
});
const emitterB = emitter({
  position: Vector(800, 200),
  velocity: Vector(-2, 0),
});
const emitters = [emitterA, emitterB];

// Fields
// ------
const fielRepel = Field({ position: Vector(400, 200), mass: -140 });
const fielRepel2 = Field({ position: Vector(500, 400), mass: 300 });
const fields = [fielRepel, fielRepel2];

// Particles
// ---------
const addParticlesToEmitters = emtrs => particles =>
  emtrs.reduce(
    (acc, cur) => [
      ...acc,
      ...R.call(
        R.times(() => Particle.attachToField(Particle, cur)),
        cur.frequency,
      ),
    ],
    particles,
  );

// paint
// -----
const drawFields = () =>
  fields.forEach(fld => circleGradiantDraw(disp.ctx, fld));
const drawEmitters = () =>
  emitters.forEach(emttr => circleGradiantDraw(disp.ctx, emttr));
const drawParticles = (particles = []) =>
  particles.forEach(prtcl => squaredDraw({ ctx: disp.ctx, obj: prtcl }));
// move
// ----
const moveParticles = flds => particles =>
  particles.map(part => Particle.move(part, flds));

// Clean
// -----
const cleanParticles = (boundry = { x, y }) => (parts = []) =>
  parts.filter(
    ({ position }) =>
      position.x < boundry.x &&
      position.y < boundry.y &&
      position.x > 0 &&
      position.y > 0,
  );

// Loop
// ------
const requestFrame = cont => particles =>
  // eslint-disable-next-line no-use-before-define
  cont && requestAnimationFrame(() => loop(cont, particles));

const boundry = disp => Vector(disp.canvas.width, disp.canvas.height);

const loop = (cont, particles = []) => {
  // clear
  clearCtx(disp);
  R.pipe(
    cleanParticles(boundry(disp)),
    moveParticles(fields),
    addParticlesToEmitters(emitters),
    R.tap(drawFields),
    R.tap(drawEmitters),
    R.tap(drawParticles),
    R.tap(requestFrame(cont - 1)),
  )(particles);
};

loop(900);
