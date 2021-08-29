import EventHandler from "../../src/oo/EventHandler.js"

describe('OO :: Test EventHandler', () => {
  test('It should not be directly instantiate with new operator', () => {
    expect(() => new EventHandler()).toThrow(Error);
  });
  // TODO:: Not working
  /*
  test('It should be instantiate with static method getInstance()', () => {
    const eh = EventHandler.getInstance();
    expect(() => eh instanceof EventTarget).toBe(true);
  });
  */
});

// @ponicode
describe("EventHandler.default.getInstance", () => {
    test("0", () => {
        let callFunction = () => {
            EventHandler.default.getInstance()
        }
    
        expect(callFunction).not.toThrow()
    })
})
