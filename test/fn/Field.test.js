import { Field } from '../../src/fn/Field.js';

describe('λ :: Test Field', () => {
  test('get a field', () => {
    const newField = Field();
    expect(newField).toEqual({
      position: { x: 0, y: 0 },
      size: 28,
      mass: -450,
      color: [[0, 0, 255, 1], [255, 0, 0, 1]],
    });
  });

  test('get a Field with size = 50', () => {
    const newField = Field({ size: 50 });
    expect(newField).toEqual({
      position: { x: 0, y: 0 },
      size: 50,
      mass: -450,
      color: [[0, 0, 255, 1], [255, 0, 0, 1]],
    });
  });
});
