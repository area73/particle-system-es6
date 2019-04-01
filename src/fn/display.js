import { Vector } from './Vector.js';

const toRGBA = arr => `rgba(${[...arr].join()})`;

export const Display = canvas => ({
  canvas,
  ctx: canvas.getContext('2d'),
});

Display.squaredDraw = ({ disp, obj }) => {
  const { ctx } = disp;
  const { color, position, size } = obj;
  ctx.fillStyle = toRGBA(color);
  ctx.fillRect(position.x, position.y, size, size);
};

Display.circleDraw = ({ disp, obj, gradient = null }) => {
  const { ctx } = disp;
  const { color, position, size } = obj;
  ctx.fillStyle = gradient || toRGBA(color) || toRGBA(color[0]);
  ctx.beginPath();
  ctx.arc(position.x, position.y, size, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
};

Display.boundary = disp => Vector(disp.canvas.width, disp.canvas.height);

Display.circleGradientDraw = (disp, obj) => {
  const { ctx } = disp;
  const { position, size, color } = obj;
  const gradient = ctx.createRadialGradient(
    position.x,
    position.y,
    size,
    position.x,
    position.y,
    0,
  );
  gradient.addColorStop(0, toRGBA(color[0]));
  gradient.addColorStop(1, toRGBA(color[1] || color[0]));
  Display.circleDraw({ disp, obj, gradient });
};

Display.clearCtx = disp => () =>
  Display.clone(disp).ctx.clearRect(
    0,
    0,
    disp.canvas.width,
    disp.canvas.height,
  );

Display.clone = disp => ({ ...disp });
