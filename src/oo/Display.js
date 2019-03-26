import { PSEvent } from './PSEvent.js';

export default class Display {
  constructor(canvas, eventHandler) {
    this.canvas = canvas;
    this.context = undefined;
    this.numFrames = 0;
    this.maxRenderingFrames = 33300;
    this.scale = 1;
    this.eventHandler = eventHandler;
    this._init();
  }

  _init() {
    this.context = this.canvas.getContext('2d');
    this.context.scale(this.scale, this.scale);
    this.width = this.canvas.width / this.scale;
    this.height = this.canvas.height / this.scale;
    this._eventBuilder();
    this._main();
  }

  _eventBuilder() {
    this.newFrameEv = new Event(PSEvent.newFrame);
    this.beforeUpdateEv = new Event(PSEvent.beforeUpdate);
    this.updateEv = new Event(PSEvent.update);
    this.afterUpdateEv = new Event(PSEvent.afterUpdate);
    this.beforeDrawEv = new Event(PSEvent.beforeDraw);
    this.drawEv = new Event(PSEvent.draw);
    this.afterDrawEv = new Event(PSEvent.afterDraw);
  }

  _main() {
    this._nextFrame();
    const execute = this.numFrames < this.maxRenderingFrames;
    execute && requestAnimationFrame(() => this._main());
  }

  _nextFrame() {
    this._clear();
    this.eventHandler.dispatchEvent(this.newFrameEv);
    this.eventHandler.dispatchEvent(this.beforeUpdateEv);
    this.eventHandler.dispatchEvent(this.updateEv);
    this.eventHandler.dispatchEvent(this.afterUpdateEv);
    this.eventHandler.dispatchEvent(this.beforeDrawEv);
    this.eventHandler.dispatchEvent(this.drawEv);
    this.eventHandler.dispatchEvent(this.afterDrawEv);
    this._tick();
  }

  drawCircle(point, radius) {
    this.context.beginPath();
    this.context.arc(point.x, point.y, radius, 0, Math.PI * 2);
    this.context.closePath();
    this.context.fill();
  }

  fillStyle(fill) {
    this.context.fillStyle = fill;
  }

  _tick() {
    this.numFrames += 1;
  }

  _clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  _start() {
    this.paused = false;
  }
}
