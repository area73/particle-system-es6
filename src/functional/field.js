export const field = ({
                        position = { x: 0, y: 0 },
                        size = 28,
                        mass = -450,
                        color = [[0, 0, 255, 1], [255, 0, 0, 1]],
                      }) => ({
  position,
  size,
  mass,
  color,
});
