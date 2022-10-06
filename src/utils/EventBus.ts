type Listener = Record<string, Function[]>

export default class EventBus<Key extends string, Func extends Function> {
  private listeners: Listener = {};

  on(event: Key, callback: Func): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: Key, callback: Func): void {
    if (!this.listeners[event]) {
      throw new Error(`Не зарегистрировано событие: ${String(event)}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener: Function) => {
      if (listener === callback) {
        return false;
      }
      return true;
    });
  }

  emit(event: Key, ...args: unknown[]): void {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener: Function) => listener(...args));
  }
}
