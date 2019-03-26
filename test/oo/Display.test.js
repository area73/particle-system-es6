import Display from '../../src/oo/Display.js';
import EventHandler from './mock/EventHandler.mock.js';
import Vector from '../../src/oo/Vector.js';

const eh = EventHandler.getInstance();
document.body.innerHTML = `<canvas id="canvas" style="background-color:black"></canvas>`;
const canvas = document.getElementById('canvas');
const disp = new Display(canvas, eh);
disp.init();

describe('OO :: Display', () => {
  test(' given a canvas and EventHandler create a Display and initilize', () => {
    const newDispl = new Display(canvas, eh);
    newDispl.init();
    expect(disp).toBeInstanceOf(Display);
  });

  test('eventBuilder  Display', () => {
    disp.eventBuilder();
    expect(disp).toBeInstanceOf(Display);
  });

  test('main  Display', () => {
    disp.main();
    expect(disp).toBeInstanceOf(Display);
  });

  test('nextFrame  Display', () => {
    disp.nextFrame();
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

  test('tick  Display', () => {
    disp.tick();
    expect(disp).toBeInstanceOf(Display);
  });

  test('clear Display', () => {
    disp.clear();
    expect(disp).toBeInstanceOf(Display);
  });

  test('start Display', () => {
    disp.start();
    expect(disp).toBeInstanceOf(Display);
  });
});
