/* eslint-disable @typescript-eslint/ban-types */
type Listener = Record<string, Function[]>

export default class EventBus<Key extends string, Func extends Function> {
  listeners: Listener = {};

  on(event: Key, callback: Func): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  // Удаляет все экземпляры callback из listeners
  offAll(event: Key, callback: Func): void {
    if (!this.listeners[event]) {
      throw new Error(`Не зарегистрировано событие: ${String(event)}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener: Function) => {
      if (listener.toString() === callback.toString()) {
        return false;
      }

      return true;
    });
  }

  // Удаляет один экземпляр callback из listeners
  offOne(event: Key, callback: Func): void {
    if (!this.listeners[event]) {
      throw new Error(`Не зарегистрировано событие: ${String(event)}`);
    }

    this.listeners[event].some((listener: Function, i: number) => {
      if (listener.toString() === callback.toString()) {
        this.listeners[event].splice(i, 1);
        return true;
      }

      return false;
    });
  }

  emit(event: Key, ...args: unknown[]): void {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener: Function) => listener(...args));
  }
}
