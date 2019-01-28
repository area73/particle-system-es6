import {
  circleDraw,
  circleGradiantDraw,
  display,
  clearCtx,
  squaredDraw,
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
const emitterA = emitter({
  position: { x: 200, y: 200 },
  velocity: { x: 2, y: 0 },
});
const emitterB = emitter({
  position: { x: 800, y: 200 },
  velocity: { x: -2, y: 0 },
});
const emitters = [emitterA, emitterB];

// Fields
// ------
const fields = [];
const fielRepel = field({ position: { x: 500, y: 200 }, mass: -140 });
// const fielRepel2 = field({ position: { x: 200, y: 300 }, mass: 600 });
fields.push(fielRepel);

// Particles
// ---------
let particles = [];
const addParticles = () => {
  emitters.forEach(ref => {
    let subArr = [];
    for (let i = 0; i < ref.frequency; i += 1) {
      const newParticle = attachParticleToRef(particle, ref);
      subArr = [...subArr, newParticle];
    }

    particles = [...particles, ...subArr];
  });
};

// paint
// -----
const drawFields = () =>
  fields.forEach(fld => circleGradiantDraw(disp.ctx, fld));

const drawEmitters = () =>
  emitters.forEach(emttr => circleGradiantDraw(disp.ctx, emttr));

const drawParticles = () =>
  particles.forEach(prtcl => squaredDraw({ ctx: disp.ctx, obj: prtcl }));

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
  100 % 0 === 0 && console.log(particles.length);
  cont && requestAnimationFrame(() => loop(cont - 1));
};

loop(900);
