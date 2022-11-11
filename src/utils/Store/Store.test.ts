import { StoreEvents } from '../../consts';
import { store } from '../index';

describe('utils/Store', () => {
  it('should set state.', () => {
    store.setState({ user: { id: 123 } });

    expect(store.getState()?.user?.id).toBe(123);
  });

  it('should emit Update event after store was update.', () => {
    const mock = jest.fn();

    store.on(StoreEvents.updated, mock);

    store.setState({ user: { id: 123 } });

    expect(store.getState()?.user?.id).toEqual(123);
    expect(mock).toHaveBeenCalled();
  });
});
