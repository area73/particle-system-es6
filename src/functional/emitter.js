import { fromAngle, getMagnitude, polarAng } from './vector.js';


export const emitter = ({
  position = { x: 0, y: 0 },
  velocity = { x: 1, y: 1 },
  size = 20,
  spread = Math.PI / 32,
  frequency = 4, // emissionRate
  color = [[0, 255, 0, 1], [0, 0, 255, 1]],
  } = {}) => ({
  position,
  velocity,
  size,
  spread,
  frequency,
  color,
});
