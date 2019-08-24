import Display from './Display.js';
import ParticleSystem from './ParticleSystem.js';
import Vector from './Vector.js';
import EventHandler from './EventHandler.js';
import Emitter from './Emitter.js';
import Field from './Field.js';

const eventHandler = EventHandler.getInstance();

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const display = new Display(canvas, eventHandler);

const particleSystem = new ParticleSystem(eventHandler);
particleSystem.init(display);

particleSystem.addEmitter(
  new Emitter(new Vector(225, 100), Vector.fromAngle(Math.PI / 2, 2)),
);
particleSystem.addField(new Field(new Vector(300, 300), -100));
particleSystem.addField(new Field(new Vector(200, 500), 200));
particleSystem.addField(new Field(new Vector(300, 800), -300));
particleSystem.addNewParticles();
