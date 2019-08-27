export const emitter = ({
  position = { x: 0, y: 0 },
  velocity = { x: 1, y: 1 },
  size = 60,
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
