import Display from '../../src/oo/Display.js';
import EventHandler from './mock/EventHandler.mock.js';
import Vector from '../../src/oo/Vector.js';

const eh = EventHandler.getInstance();
document.body.innerHTML = `<canvas id="canvas" style="background-color:black"></canvas>`;
const canvas = document.getElementById('canvas');
const disp = new Display(canvas, eh);

describe('OO :: Display', () => {
  test(' given a canvas and EventHandler create a Display and initilize', () => {
    const newDispl = new Display(canvas, eh);
    expect(newDispl).toBeInstanceOf(Display);
  });

  test('_eventBuilder  Display', () => {
    disp._eventBuilder();
    expect(disp).toBeInstanceOf(Display);
  });

  test('_main  Display', () => {
    disp._main();
    expect(disp).toBeInstanceOf(Display);
  });

  test('_nextFrame  Display', () => {
    disp._nextFrame();
    expect(disp).toBeInstanceOf(Display);
  });

  test('drawCircle  Display', () => {
    disp.drawCircle(new Vector(2, 2), 30);
    expect(disp).toBeInstanceOf(Display);
  });

  test('fillStyle  Display', () => {
    disp.fillStyle('#aaa');
    expect(disp).toBeInstanceOf(Display);
  });

  test('_tick  Display', () => {
    disp._tick();
    expect(disp).toBeInstanceOf(Display);
  });

  test('_clear Display', () => {
    disp._clear();
    expect(disp).toBeInstanceOf(Display);
  });

  test('_start Display', () => {
    disp._start();
    expect(disp).toBeInstanceOf(Display);
  });
});
