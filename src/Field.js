/**
 * Field is the field of attraction (positive or negative) that particles will
 * be influenced. It is a gravitational mass
 */

import Vector from './Vector.js';

let _drawColor = '#d4a8a1';
let _drawColor2 = '#500';

export default class Field {

  static get drawColor() {
    return _drawColor;
  }

  static set drawColor( color) {
    _drawColor = color;
  }

  static get drawColor2() {
    return _drawColor2;
  }

  static set drawColor2( color) {
    _drawColor2 = color;
  }

  static fromString(string) {
    var parts = string.substr(1).split(':');
    var field = new Field(Vector.fromString(parts.shift()),parseInt(parts.shift(),10));
    return field;
  };

  constructor (point, mass) {
    this.position   = point;
    this.size       = 15;
    this.mass       = 0;
    this.drawColor  = '#b00';
    this.setMass(mass);
  }

  setMass(mass) {
    this.mass = mass;
    this.drawColor = mass < 0 ? "#f99" : "#9f9";
    return this;
  };
  moveTo(point) {
    this.position = point;
  };

  toString() {
    var coreAttributes = [
      this.position.toString(),
      this.mass
    ];
    return 'F' + coreAttributes.join(':');
  };
}
