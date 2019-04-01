import { Display } from './display.js';

export const draw = display => ({ display });

draw.fields = flds => dspl =>
  flds.forEach(fld => Display.circleGradientDraw(dspl, fld));

draw.emitters = emttrs => dspl =>
  emttrs.forEach(emttr => Display.circleGradientDraw(dspl, emttr));

draw.particles = (particles = []) => dspl =>
  particles.forEach(prtcl => Display.squaredDraw({ disp: dspl, obj: prtcl }));
