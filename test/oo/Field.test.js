import Field from '../../src/oo/Field.js';
import Vector from '../../src/oo/Vector.js';

const point = new Vector(12, -16);
const mass = 150;
const field = new Field(point, mass);

describe('OO :: Field', () => {
  test(' Given a point an a mass instantiate a Field Object', () => {
    expect(field).toBeObject();
  });
  test('can access to object\'s position', () => {
    expect(field.position).toBeInstanceOf(Vector);
  });
  test('can access to object\'s size', () => {
    expect(field.size).toBeNumber();
  });
  test('can access to object\'s mass', () => {
    expect(field.mass).toBeNumber();
  });
  test('get/set static method backgroundColor', () => {
    const initialColor = Field.backgroundColor;
    expect(initialColor).toBeString();
    expect(initialColor).toStartWith('#');
    const newColor = initialColor === '#000' ? '#FFF' : '#000';
    Field.backgroundColor = newColor;
    expect(initialColor).not.toBe(Field.backgroundColor);
  });
  test('get/set static method foregroundColor', () => {
    const initialColor = Field.foregroundColor;
    expect(initialColor).toBeString();
    expect(initialColor).toStartWith('#');
    const newColor = initialColor === '#000' ? '#FFF' : '#000';
    Field.foregroundColor = newColor;
    expect(initialColor).not.toBe(Field.foregroundColor);
  });
});
