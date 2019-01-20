export default class Vector {
  static fromAngle(angle, magnitude) {
    return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getMagnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  copy() {
    return new Vector(this.x, this.y);
  }
}
