import Display from './Display.js';
import ParticleSystem from './ParticleSystem.js';
import Vector from './Vector.js';
import EventHandler from './EventHandler.js';

const eventHandler = EventHandler.getInstance();
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const display = new Display(canvas, eventHandler);
display.init();
const particleSystem = new ParticleSystem(eventHandler);
particleSystem.init(display);
display.start();
particleSystem.addEmitter(new Vector(200, 200), Vector.fromAngle(0, 2));
particleSystem.addEmitter(new Vector(800, 200), Vector.fromAngle(Math.PI, 2));
particleSystem.addField(new Vector(500, 200), -140);
particleSystem.addNewParticles();
