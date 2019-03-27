import Vector from '../../src/oo/Vector';

describe('OO :: Test Vector', () => {
  test('get a vector', () => {
    const v = new Vector(10, 20);
    expect(v).toEqual({x: 10, y: 20});
  });

  test('get a magnitude', () => {
    const v = new Vector(7, 22);
    const magnitude = v.getMagnitude();
    expect(magnitude).toBe(23.08679276123039);
  });

  test('get a magnitude (edge case)', () => {
    const v = new Vector(0, 22);
    const magnitude = v.getMagnitude();
    expect(magnitude).toBe(22);
  });

  test('get Polar angle of a vector', () => {
    const v = new Vector(10, 20);
    const ang = v.polar();
    expect(ang).toBe(1.1071487177940904);
  });

  test('get Polar angle of a vector (edge)', () => {
    const v = new Vector(0, 20);
    const ang = v.polar();
    expect(ang).toBe(1.5707963267948966);
  });

  test('get Polar angle of a vector (edge)', () => {
    const v = new Vector(20, 0);
    const ang = v.polar();
    expect(ang).toBe(0);
  });

  test('copy a vector', () => {
    const v = new Vector(10, 20);
    const v2 = v.copy();
    expect(v).not.toBe(v2);
    expect(v).toEqual(v2);
  });
});
