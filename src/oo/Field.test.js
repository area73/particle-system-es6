import Field from '../../src/oo/Field.js';
import Vector from '../../src/oo/Vector.js';

const point = new Vector(12, -16);
const mass = 150;
const field = new Field(point, mass);

describe('OO :: Field', () => {
  test(' Given a point an a mass instantiate a Field Object', () => {
    expect(field).toBeObject();
  });
  test("can access to object's position", () => {
    expect(field.position).toBeInstanceOf(Vector);
  });
  test("can access to object's size", () => {
    expect(field.size).toBeNumber();
  });
  test("can access to object's mass", () => {
    expect(field.mass).toBeNumber();
  });
  test('get/set  method backgroundColor', () => {
    const initialColor = field.backgroundColor;
    expect(initialColor).toBeString();
    expect(initialColor).toStartWith('#');
    field.backgroundColor = initialColor === '#000' ? '#FFF' : '#000';
    expect(initialColor).not.toBe(field.backgroundColor);
  });
  test('get/set static method foregroundColor', () => {
    const initialColor = field.foregroundColor;
    expect(initialColor).toBeString();
    expect(initialColor).toStartWith('#');
    field.foregroundColor = initialColor === '#000' ? '#FFF' : '#000';
    expect(initialColor).not.toBe(field.foregroundColor);
  });
});
