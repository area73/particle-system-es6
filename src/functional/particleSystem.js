import { circleGradiantDraw, Display, squaredDraw } from './display.js';
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
const emitters = [
  emitter({
    position: Vector(200, 200),
    velocity: Vector(2, 0),
  }),
  emitter({
    position: Vector(800, 200),
    velocity: Vector(-2, 0),
  }),
];
// Fields
// ------
const fields = [
  Field({ position: Vector(400, 200), mass: -140 }),
  Field({ position: Vector(500, 400), mass: 300 }),
];

// Particles
// ---------
const addParticlesToEmitters = emtrs => particles =>
  emtrs.reduce(
    (acc, cur) => [
      ...acc,
      ...R.call(
        R.times(() => Particle.attachToField(Particle(), cur)),
        cur.frequency,
      ),
    ],
    particles,
  );

// paint
// -----
const drawFields = (fields, disp) => () =>
  fields.forEach(fld => circleGradiantDraw(disp.ctx, fld));
const drawEmitters = (emitters, disp) => () =>
  emitters.forEach(emttr => circleGradiantDraw(disp.ctx, emttr));
const drawParticles = disp => (particles = []) =>
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
const requestFrame = cont => disp => fields => emitters => particles =>
  // eslint-disable-next-line no-use-before-define
  cont &&
  requestAnimationFrame(() => loop(cont, disp, fields, emitters, particles));

const boundry = disp => Vector(disp.canvas.width, disp.canvas.height);
const loop = (cont, disp, fields, emitters, particles = []) => {
  R.pipe(
    R.tap(Display.clearCtx(disp)),
    cleanParticles(boundry(disp)),
    moveParticles(fields),
    addParticlesToEmitters(emitters),
    R.tap(drawFields(fields, disp)),
    R.tap(drawEmitters(emitters, disp)),
    R.tap(drawParticles(disp)),
    R.tap(requestFrame(cont - 1)(disp)(fields)(emitters)),
  )(particles);
};

loop(900, disp, fields, emitters);
