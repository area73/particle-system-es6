import {PSEvent} from './PSEvent.js';


export default class Display {
  constructor(canvas,eventHandler) {
    this.canvas = canvas;
    this.context = undefined;
    this.numFrames = 0;
    this.paused = true;
    this.scale = 1;
    this.draw = {
      continuous : false,
      info       : true
    };
    this.eventHandler = eventHandler;
    this.ev = new Event(PSEvent.newFrame);
    // console.log(this)
  }

  init() {
    this.context = this.canvas.getContext("2d");
    this.context.scale(this.scale, this.scale);
    this.width = this.canvas.width / this.scale;
    this.height = this.canvas.height / this.scale;

    /*
    this.canvas.onmousedown = function (evt) {
      this.trigger('mouseDown', evt);
      return false;
    }.bind(this);

    this.canvas.onmouseup = function (evt) {
      this.trigger('mouseUp', evt);
      return false;
    }.bind(this);
    this.canvas.onmouseover = function (evt) {this.trigger('mouseOver', evt);}.bind(this);
    this.canvas.onmousemove = function (evt) {this.trigger('mouseMove', evt);}.bind(this);
    */

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
    !this.paused && this.nextFrame();
    (this.numFrames < 2000) && requestAnimationFrame(this.main.bind(this));

  }

  nextFrame() {
    !this.draw.continuous && this.clear();
    this.eventHandler.dispatchEvent(this.newFrameEv);
    this.eventHandler.dispatchEvent(this.beforeUpdateEv);
    this.eventHandler.dispatchEvent(this.updateEv);
    this.eventHandler.dispatchEvent(this.afterUpdateEv);
    this.eventHandler.dispatchEvent(this.beforeDrawEv);
    this.eventHandler.dispatchEvent(this.drawEv);
    this.eventHandler.dispatchEvent(this.afterDrawEv);
    this.tick();
  }
  drawLine(startPoint, endPoint) {
    this.context.beginPath();
    this.context.moveTo(startPoint.x, startPoint.y);
    this.context.lineTo(endPoint.x, endPoint.y);
    this.context.stroke();
  }
  drawText(txt, point, width) {
    this.context.fillText(txt, point.x, point.y, width);
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
  strokeStyle(fill) {
    this.context.strokeStyle = fill;
    }

  tick() {
    this.numFrames++;
    // console.log("numFrames",this.numFrames)
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
  start() { this.paused = false; }
  stop() { this.paused = true; }
  togglePause() { this.paused = !this.paused;}
  step() {
    this.stop();
    this.nextFrame();
  }
}


