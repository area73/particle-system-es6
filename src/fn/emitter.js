import * as R from '../../lib/ramda/index.js';
import { Particle } from './particle.js';

export const emitter = ({
  position = { x: 0, y: 0 },
  velocity = { x: 1, y: 1 },
  size = 15,
  spread = Math.PI / 32,
  frequency = 4, // emissionRate
  color = [[0, 217, 255, 0], [255, 255, 255, 0.439]],
} = {}) => ({
  position,
  velocity,
  size,
  spread,
  frequency,
  color,
});

emitter.addParticles = emmit =>
  R.call(R.times(() => Particle.attachToEmitter(emmit)), emmit.frequency);

emitter.addColorfulParticles = emmit =>
  R.call(
    R.times(() =>
      Particle.attachToEmitter(
        emmit,
        Particle({
          color: [
            Math.round(Math.random() * 255),
            Math.round(Math.random() * 255),
            Math.round(Math.random() * 255),
            Math.random() / 2,
          ],
          // size: Math.round(Math.random() * 20) + 1,
        }),
      ),
    ),
    emmit.frequency,
  );
