import Vector from './Vector.js';

export default class Field {
  _backgroundColor = '#ff000000';

  _foregroundColor = '#ffff0080';

  get backgroundColor() {
    return this._backgroundColor;
  }

  set backgroundColor(color) {
    this._backgroundColor = color;
  }

  get foregroundColor() {
    return this._foregroundColor;
  }

  set foregroundColor(color) {
    this._foregroundColor = color;
  }

  constructor(point = new Vector(0, 0), mass = 0) {
    this.position = point;
    this.size = Math.abs(mass);
    this.setMass(mass);
  }

  setMass(mass) {
    this.mass = mass;
    this._setColorByMassValue(mass);
    return this;
  }

  _setColorByMassValue(mass) {
    if (mass < 0) {
      this.backgroundColor = '#4287E000';
      this.foregroundColor = '#13FF0580';
    } else {
      this.backgroundColor = '#ff000000';
      this.foregroundColor = '#ffff0080';
    }
  }
}
