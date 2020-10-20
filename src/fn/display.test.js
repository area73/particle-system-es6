import { Display } from '../../src/fn/display.js';

// console.log('---->',display.ctx)

describe('λ :: Test display', () => {
  document.body.innerHTML = `<canvas id="canvas"></canvas>`;
  const canvas = document.getElementById('canvas');
  const disp = Display(canvas);

  test('getting a display', () => {
    expect(disp).toBeObject();
  });

  test('squaredDraw in a display', () => {
    const obj = { color: '#fff', position: { x: 0, y: 0 }, size: 40 };
    const nullRes = Display.squaredDraw({ disp, obj });
    expect(nullRes).toBeUndefined();
  });
});
