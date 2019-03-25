export default class Vector {
  static fromAngle(angle, magnitude) {
    return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
  }

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  getMagnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  // TODO: change signature of method to be "polar()" like in FP
  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  copy() {
    return new Vector(this.x, this.y);
  }
}
