import { Display } from './display.js';
import { Particle } from './particle.js';
import * as R from '../../lib/ramda';
import { Data } from './data4.js';
import { draw } from './draw.js';
import { emitter } from './emitter.js';

// Display
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const disp = Display(canvas);
// Emitters, fields
const { emitters, fields } = Data;

// Particles
export const addNewParticlesToEmitters = emtrs => particles =>
  // emtrs.reduce((acc, cur) => [...acc, ...emitter.addParticles(cur)], particles);
  emtrs.reduce(
    (acc, cur) => [...acc, ...emitter.addColorfulParticles(cur)],
    particles,
  );
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

const redrawElements = fld => emitt => dis => part =>
  R.pipe(
    R.tap(Display.clearCtx),
    R.tap(draw.fields(fld)),
    R.tap(draw.emitters(emitt)),
    R.tap(draw.particles(part)),
  )(dis);

const loop = (cont, dspl, flds, emttrs, particles = []) => {
  R.pipe(
    addNewParticlesToEmitters(emitters),
    moveParticles(fields),
    removeUnboundParticles(Display.boundary(disp)),
    R.tap(redrawElements(fields)(emitters)(disp)),
    R.tap(requestFrame(cont - 1)(disp)(fields)(emitters)),
  )(particles);
};

loop(-1, disp, fields, emitters);
