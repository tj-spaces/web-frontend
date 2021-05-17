class TypedEventEmitter<EventMap extends {[eventName: string]: unknown[]}> {
	private listeners = new Map<any, Set<Function>>();

	on<T extends keyof EventMap>(
		eventName: T,
		handler: (...args: EventMap[T]) => void
	) {
		if (!this.listeners.has(eventName)) {
			this.listeners.set(eventName, new Set());
		}
		this.listeners.get(eventName)!.add(handler);

		return {
			remove: () => {
				this.off(eventName, handler);
			},
		};
	}

	once<T extends keyof EventMap>(
		eventName: T,
		handler: (...args: EventMap[T]) => void
	) {
		return this.on(eventName, (...args) => {
			handler(...args);
			this.off(eventName, handler);
		});
	}

	off<T extends keyof EventMap>(
		eventName: T,
		handler: (...args: EventMap[T]) => void
	) {
		if (!this.listeners.has(eventName)) {
			return;
		}

		this.listeners.get(eventName)!.delete(handler);

		if (this.listeners.get(eventName)!.size === 0) {
			this.listeners.delete(eventName);
		}
	}

	emit<T extends keyof EventMap>(eventName: T, ...args: EventMap[T]) {
		const listeners = this.listeners.get(eventName);
		if (listeners) {
			listeners.forEach((listener) => listener(...args));
		}
	}
}

export default TypedEventEmitter;
