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
    this.backgroundColor = mass < 0 ? '#7FB7FF0A' : '#ff000000';
    this.foregroundColor = mass < 0 ? '#13FF0560' : '#ffff0080';
  }
}
