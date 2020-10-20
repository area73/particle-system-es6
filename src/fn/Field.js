export const Field = ({
  position = { x: 0, y: 0 },
  size,
  mass = -450,
  color = [
    [127, 183, 255, 0.039],
    [19, 255, 5, 0.376],
  ],
} = {}) => ({
  position,
  size: size || Math.abs(mass),
  mass,
  color:
    mass < 0
      ? color
      : [
          [255, 0, 0, 0],
          [255, 255, 0, 0.501],
        ],
});
