export const toRGBA = arr => `rgba(${[...arr].join()})`;

export const Display = canvas => ({
  canvas,
  ctx: canvas.getContext('2d'),
});

export const squaredDraw = ({ ctx, obj }) => {
  ctx.fillStyle = toRGBA(obj.color);
  ctx.fillRect(obj.position.x, obj.position.y, obj.size, obj.size);
};

export const circleDraw = ({ ctx, obj, gradient = null }) => {
  ctx.fillStyle = gradient || toRGBA(obj.color) || toRGBA(obj.color[0]);
  ctx.beginPath();
  ctx.arc(obj.position.x, obj.position.y, obj.size, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
};

export const circleGradiantDraw = (ctx, obj) => {
  const gradient = ctx.createRadialGradient(
    obj.position.x,
    obj.position.y,
    obj.size,
    obj.position.x,
    obj.position.y,
    0,
  );
  gradient.addColorStop(0, toRGBA(obj.color[0]));
  gradient.addColorStop(1, toRGBA(obj.color[1] || obj.color[0]));
  circleDraw({ ctx, obj, gradient });
};

export const clearCtx = disp =>
  disp.ctx.clearRect(0, 0, disp.canvas.width, disp.canvas.height);
