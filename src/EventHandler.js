const _singletonEnforncer = Symbol('private');
let _instance;

export default class EventHandler extends EventTarget {

  static getInstance() {
    return _instance ? _instance : new EventHandler(_singletonEnforncer);
  }

  static throwSingletonError() {
    throw new Error(`
    Singleton Error instantiation:
    EventHandler can only be instantiate by its static method EventHandler.getInstance()
    `);
  }

  constructor (enfonrcer) {
    (enfonrcer !== _singletonEnforncer) && EventHandler.throwSingletonError();
    super();
    _instance = this;
    console.log("EventHandler created");
  }
}
