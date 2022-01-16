import { Display } from './display.js';
import { Particle } from './particle.js';
import { Data } from './data/data.js';
import { tap, pipe, times } from './fnUtils.js';

// INITIAL DATA (Display, emitters, fields)
// ---------------------------------------
// Display
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const disp = Display(canvas);

// Emitters, fields
const { emitters, fields } = Data;

// FUNCTIONS
// ---------------------------------------
// move
const moveParticles = (flds) => (particles) =>
  particles.map((part) => Particle.move(part, flds));

// Clean
const removeUnboundParticles = (boundary = { x, y }) => (parts = []) =>
  parts.filter((particle) => Particle.isInBound(boundary, particle));

const randomParticle = () =>
  Particle({
    color: [
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
      Math.random() / 2,
    ],
    size: Math.round(Math.random() * 5) + 1,
  });

// Extras
// --------------------------------------------------------------
// TEST : grow particles
const incrementSize = (part) => ({ ...part, size: part.size + 1 });
const particleGrow = (arr) =>
  arr.reduce((acc, cur) => [...acc, incrementSize(cur)], []);

const addParticles = (n) => (arr) => [...arr, ...times(Particle, n)];

const limitNumberOfParticles = (n) => (part) => part.slice(0, n);
const linmitTO1000 = (part) => limitNumberOfParticles(1000)(part);

// ---------------------------------------------------------------

// MAIN PIPE
// ----------------------------------------
// Loop
const requestFrame = (cont) => (dspl) => (flds) => (emttrs) => (prtcls) =>
  // eslint-disable-next-line no-use-before-define
  cont && requestAnimationFrame(() => loop(cont, dspl, flds, emttrs, prtcls));

// Particles
export const addNewParticlesToEmitters = (emttrs) => (particles) => {
  // [1] crear una particula random
  // [2] añadirla al emisor (override de sus propiedades, posición, velocidad, etc)
  // [3] repetirlo según frecuencia del emisor
  // [4] repetirlo por cada emisor
  // [5] añadilo al array principal (paticulas)
  return [
    /* [5] */ ...particles,
    /* [4] */ ...emttrs.reduce(
      (acc, cur) => [
        ...acc,
        /* [3] */ ...times(
          () =>
            Particle.attachToEmitter(cur, randomParticle() /* [1] */) /* [2] */,
          // () => Particle.attachToEmitter(cur, randomParticle() /* [1] */) /* [2] */,
          cur.frequency,
        ),
      ],
      [],
    ),
  ];
};

// -----------------------
// MAIN APPLICATION (LOOP)
// -----------------------

const redrawElements = (fld) => (emitt) => (dis) => (part) =>
  pipe(
    tap(Display.clearCtx),
    tap(Display.drawFields(fld)),
    tap(Display.drawEmitters(emitt)),
    tap(Display.drawParticles(part)),
  )(dis);

const loop = (cont, dspl, flds, emttrs, particles = []) => {
  pipe(
    // tap((x) => console.log(addNewParticlesToEmitters(emitters))),
    addNewParticlesToEmitters(emttrs),
    // addParticles(6),
    moveParticles(fields),
    // particleGrow,
    removeUnboundParticles(Display.boundary(disp)),
    // linmitTO1000,
    tap(redrawElements(fields)(emitters)(disp)),
    tap(requestFrame(cont - 1)(disp)(fields)(emitters)),
  )(particles);
};

loop(-1, disp, fields, emitters);
