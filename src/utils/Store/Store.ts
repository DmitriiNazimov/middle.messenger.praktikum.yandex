import EventBus from '../Rendering/EventBus';
import { defaultState } from './defaultState';
import { StoreEvents } from '../../consts';

class Store<State> extends EventBus<string, Function> {
  state: State;

  constructor(defaultData: State) {
    super();
    this.state = defaultData;
  }

  getState(): State | null {
    return this.state;
  }

  setState(nextState: State) {
    this.state = { ...this.state, ...nextState };
    this.emit(StoreEvents.updated);
  }
}

export default new Store(defaultState);
