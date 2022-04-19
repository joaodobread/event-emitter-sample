type CbType<T extends unknown = unknown> = () => Promise<T> | T;

export class EventEmitter {
  private events: Map<string, Set<CbType>>;

  constructor() {
    this.events = new Map<string, Set<CbType>>();
  }

  on(event: string, listerner: () => unknown): EventEmitter {
    let listeners = this.events.get(event);
    if (!listeners) listeners = new Set<CbType>();
    listeners.add(listerner);
    this.events.set(event, listeners);
    return this;
  }

  off(event?: string, listener?: () => unknown): EventEmitter {
    if (event && !listener) {
      this.events.delete(event);
      return this;
    }
    if (event && listener) {
      const listeners = this.events.get(event);
      if (listeners) listeners.delete(listener);
      return this;
    }
    this.events.clear();
    return this;
  }

  emit(event: string, ...args: []) {
    const listeners = this.events.get(event);
    const responses: unknown[] = [];
    if (listeners)
      for (const listener of listeners)
        responses.push(listener.apply(this, args));
    return responses;
  }
}
