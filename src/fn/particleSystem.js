import { Display } from './display.js';
import { Particle } from './particle.js';
import * as R from '../../lib/ramda';
import { Data } from './data.js';

// Display
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const disp = Display(canvas);
// Emitters, fields
const { emitters, fields } = Data;
// Particles
const addParticlesToEmitters = emtrs => particles =>
  emtrs.reduce(
    (acc, cur) => [
      ...acc,
      ...R.call(R.times(() => Particle.attachToEmitter(cur)), cur.frequency),
    ],
    particles,
  );

const Draw = display => ({ display });

// paint
Draw.fields = (flds, dspl) => () => {
  return flds.forEach(fld => Display.circleGradientDraw(dspl, fld));
};

const drawEmitters = (emttrs, dspl) => () =>
  emttrs.forEach(emttr => Display.circleGradientDraw(dspl, emttr));
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
    R.tap(Draw.fields(fields, disp)),
    R.tap(drawEmitters(emitters, disp)),
    R.tap(drawParticles(disp)),
    R.tap(requestFrame(cont - 1)(disp)(fields)(emitters)),
  )(particles);
};

loop(900, disp, fields, emitters);
