import ParticleSystem from '../../src/oo/ParticleSystem.js';
import EventHandler from '../../src/oo/EventHandler.js';

const eh = EventHandler.getInstance();
const ps = new ParticleSystem(eh);
describe('OO :: ParticleSytem', () => {
  test(' Given an eventHandler instantiate a ParticleSystem', () => {
    expect(ps).toBeInstanceOf(ParticleSystem);
  });
});
