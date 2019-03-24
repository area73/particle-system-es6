import {PSEvent} from '../../src/oo/PSEvent.js';
import Vector from '../../src/oo/Vector.js';

describe('OO :: PSEvent', () => {
  test('It should be a singleton const object ', () => {
    expect(PSEvent).toBeTruthy();
  });
  test('It should have a newFrame attribute', () => {
    expect(PSEvent.newFrame).toBeTruthy();
  });
  test('It should have a beforeUpdate attribute', () => {
    expect(PSEvent.beforeUpdate).toBeTruthy();
  });
  test('It should have a beforeDraw attribute', () => {
    expect(PSEvent.beforeDraw).toBeTruthy();
  });
  test('It should have a draw attribute', () => {
    expect(PSEvent.draw).toBeTruthy();
  });
  test('It should have a afterDraw attribute', () => {
    expect(PSEvent.afterDraw).toBeTruthy();
  });
});
