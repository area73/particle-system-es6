let _drawColor = '#d4a8a1';
let _drawColor2 = '#500';

export default class Field {
  static get drawColor() {
    return _drawColor;
  }

  static set drawColor(color) {
    _drawColor = color;
  }

  static get drawColor2() {
    return _drawColor2;
  }

  static set drawColor2(color) {
    _drawColor2 = color;
  }

  constructor(point, mass) {
    this.position = point;
    this.size = 28;
    this.mass = 0;
    Field.drawColor = '#b00';
    this.setMass(mass);
  }

  setMass(mass) {
    this.mass = mass;
    Field.drawColor = mass < 0 ? '#f99' : '#9f9';
    return this;
  }
}
