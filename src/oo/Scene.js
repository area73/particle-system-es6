import Display from './Display.js';
import ParticleSystem from './ParticleSystem.js';
import Vector from './Vector.js';
import EventHandler from './EventHandler.js';
import Emitter from './Emitter.js';
import Field from './Field.js';

// TODO [TALK] :: Event Handler singleton that extend EventTarget
const eventHandler = EventHandler.getInstance();
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// TODO [TALK] :: Creates an enviroment with canvas & eventHandler
const display = new Display(canvas, eventHandler);

const particleSystem = new ParticleSystem(eventHandler);
particleSystem.init(display);
display._start();
particleSystem.addEmitter(new Emitter(new Vector(225, 100), Vector.fromAngle(Math.PI/2, 2)));
particleSystem.addField(new Field(new Vector(300, 300), -100));
particleSystem.addField(new Field(new Vector(200, 500), 200));
particleSystem.addField(new Field(new Vector(300, 800), -300));

particleSystem.addNewParticles();
