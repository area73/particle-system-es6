import {
  circleDraw,
  circleGradiantDraw,
  display,
  clearCtx,
} from './display.js';
import { emitter } from './emitter.js';
import { particle, moveParticle, attachParticleToRef } from './particle.js';
import { field } from './field.js';
import Vector from '../oo/Vector.js';

// Display
// -------
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const disp = display(canvas);

// Emitters
// --------
const emitterA = emitter({ position: { x: 100, y: 100 } });
const emitterB = emitter({ position: { x: 400, y: 200 }, spread: Math.PI * 2 });
const emitters = [emitterA, emitterB];

// Particles
// ---------
let particles = [];
const addParticles = () => {
  emitters.forEach(ref => {
    let subArr = [];
    for (let i = 0; i < 4; i += 1) {
      const newParticle = attachParticleToRef(particle, ref);
      subArr = [...subArr, newParticle];
    }
    particles = [...particles, ...subArr];
  });
};

// Fields
// ------
const fields = [];
const fielRepel = field({ position: { x: 400, y: 400 }, mass: -1600 });
const fielRepel2 = field({ position: { x: 200, y: 300 }, mass: 600 });
fields.push(fielRepel, fielRepel2);

// paint
// -----
const drawFields = () =>
  fields.forEach(fld => circleGradiantDraw(disp.ctx, fld));

const drawEmitters = () =>
  emitters.forEach(emttr => circleGradiantDraw(disp.ctx, emttr));

const drawParticles = () =>
  particles.forEach(prtcl => circleDraw({ ctx: disp.ctx, obj: prtcl }));

// move
// ----
const moveParticles = flds =>
  particles.forEach(part => moveParticle(part, flds));

// Clean
// -----
const cleanParticles = (parts, boundry) =>
  parts.filter(
    part =>
      part.position.x < boundry.x &&
      part.position.y < boundry.y &&
      part.position.x > 0 &&
      part.position.y > 0,
  );

// Loop
// ------
const loop = cont => {
  // clear
  clearCtx(disp);
  // clean particles outside of field
  particles = cleanParticles(particles, { x: canvas.width, y: canvas.height });
  // move
  moveParticles(fields);
  // add new
  addParticles();
  // draw
  drawFields();
  drawEmitters();
  drawParticles();

  cont && requestAnimationFrame(() => loop(cont - 1));
};

loop(900);
