import { Display } from './display.js';
import { emitter } from './emitter.js';
import { Particle } from './particle.js';
import { Field } from './Field.js';
import { Vector } from './Vector.js';
import * as R from '../../lib/ramda';

// Display
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const disp = Display(canvas);
// Emitters
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
const fields = [
  Field({ position: Vector(400, 200), mass: -100 }),
  Field({ position: Vector(500, 400), mass: 250 }),
];
// Particles
const addParticlesToEmitters = emtrs => particles =>
  emtrs.reduce(
    (acc, cur) => [
      ...acc,
      ...R.call(R.times(() => Particle.attachToEmitter(cur)), cur.frequency),
    ],
    particles,
  );
// paint
const drawFields = (flds, dspl) => () =>
  flds.forEach(fld => Display.circleGradiantDraw(dspl, fld));
const drawEmitters = (emttrs, dspl) => () =>
  emttrs.forEach(emttr => Display.circleGradiantDraw(dspl, emttr));
const drawParticles = dspl => (particles = []) =>
  particles.forEach(prtcl => Display.squaredDraw({ disp: dspl, obj: prtcl }));
// move
const moveParticles = flds => particles =>
  particles.map(part => Particle.move(part, flds));
// Clean
const removeUnboundParticles = (boundary = { x, y }) => (parts = []) =>
  parts.filter(particle => Particle.isInBound(boundary, particle));
// Loop
const requestFrame = cont => dspl => flds => emttrs => prtcls =>
  // eslint-disable-next-line no-use-before-define
  cont && requestAnimationFrame(() => loop(cont, dspl, flds, emttrs, prtcls));

const loop = (cont, dspl, flds, emttrs, particles = []) => {
  R.pipe(
    R.tap(Display.clearCtx(disp)),
    removeUnboundParticles(Display.boundary(disp)),
    moveParticles(fields),
    addParticlesToEmitters(emitters),
    R.tap(drawFields(fields, disp)),
    R.tap(drawEmitters(emitters, disp)),
    R.tap(drawParticles(disp)),
    R.tap(requestFrame(cont - 1)(disp)(fields)(emitters)),
  )(particles);
};

loop(900, disp, fields, emitters);
