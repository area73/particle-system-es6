import {PSEvent} from './PSEvent.js';


export default class Display {
  constructor(canvas,eventHandler) {
    this.canvas = canvas;
    this.context = undefined;
    this.numFrames = 0;
    this.maxRenderingFrames = 300;
    this.scale = 1;
    this.eventHandler = eventHandler;
  }
  init() {
    this.context = this.canvas.getContext("2d");
    this.context.scale(this.scale, this.scale);
    this.width = this.canvas.width / this.scale;
    this.height = this.canvas.height / this.scale;
    this.eventBuilder();
    this.main();
  }
  eventBuilder() {
    this.newFrameEv = new Event(PSEvent.newFrame);
    this.beforeUpdateEv = new Event(PSEvent.beforeUpdate);
    this.updateEv = new Event(PSEvent.update);
    this.afterUpdateEv = new Event(PSEvent.afterUpdate);
    this.beforeDrawEv = new Event(PSEvent.beforeDraw);
    this.drawEv = new Event(PSEvent.draw);
    this.afterDrawEv = new Event(PSEvent.afterDraw);
  }
  main() {
    this.nextFrame();
    (this.numFrames < this.maxRenderingFrames) && requestAnimationFrame(this.main.bind(this));
  }
  nextFrame() {
    this.clear();
    this.eventHandler.dispatchEvent(this.newFrameEv);
    this.eventHandler.dispatchEvent(this.beforeUpdateEv);
    this.eventHandler.dispatchEvent(this.updateEv);
    this.eventHandler.dispatchEvent(this.afterUpdateEv);
    this.eventHandler.dispatchEvent(this.beforeDrawEv);
    this.eventHandler.dispatchEvent(this.drawEv);
    this.eventHandler.dispatchEvent(this.afterDrawEv);
    this.tick();
  }

  drawCircle(point, radius) {
    this.context.beginPath();
    this.context.arc(point.x, point.y, radius, 0, Math.PI * 2);
    this.context.closePath();
    this.context.fill();
  }
  fillStyle(fill) {
    this.context.fillStyle = fill
  }

  tick() {
    this.numFrames++;
  }
  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
  start() { this.paused = false; }
}


