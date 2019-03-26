import Display from './Display.js';
import ParticleSystem from './ParticleSystem.js';
import Vector from './Vector.js';
import EventHandler from './EventHandler.js';
// TODO [TALK] :: Event Handler singleton that extend EventTarget
// TODO [TALK] :: Alternative way compare with PSEvent
const eventHandler = EventHandler.getInstance();
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// TODO [TALK] :: Creates an enviroment with cnavas & eventHandler
// TODO [TALK] :: it will be in charge of creating and dispatching the events
const display = new Display(canvas, eventHandler);

const particleSystem = new ParticleSystem(eventHandler);
particleSystem.init(display);
display._start();
particleSystem.addEmitter(new Vector(200, 200), Vector.fromAngle(0, 2));
particleSystem.addEmitter(new Vector(800, 200), Vector.fromAngle(Math.PI, 2));
particleSystem.addField(new Vector(400, 300), 240);
particleSystem.addField(new Vector(500, 200), -140);
particleSystem.addNewParticles();
