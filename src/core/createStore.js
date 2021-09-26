export class CreateStore {
  constructor(rootReducer, initialState = {}) {
    this.rootReducer = rootReducer;
    this.state = this.rootReducer({...initialState}, {type: '__INIT__'});
    this.listeners = [];
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return {
      unsubscribe: () => {
        this.listeners.filter((listener) => listener !== callback);
      }
    };
  }

  dispatch(action) {
    this.state = this.rootReducer(this.state, action);
    this.listeners.forEach((listener) => listener(this.state));
  }

  getState() {
    return this.state;
  }
}
