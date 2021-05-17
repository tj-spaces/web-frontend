import TypedEventEmitter from '../TypedEventEmitter';

type EventMap<T extends Record<string, unknown>> = {
	// @ts-expect-error
	[key: keyof T]: [T[typeof key]];
};

function HookableRecord<T extends Record<string, unknown>>(defaultValues: T) {
	class HookableRecordInternal extends TypedEventEmitter<EventMap<T>> {
		private values: T;
		constructor(values: Partial<T> = {}) {
			super();
			this.values = {...defaultValues, values};

			for (let key of Object.keys(defaultValues)) {
				Object.defineProperty(this, key, {
					get: () => {
						return this.values[key];
					},
					set: (value: any) => {
						// @ts-expect-error
						this.emit(key, value);
						// @ts-expect-error
						this.values[key] = value;
					},
				});
			}
		}
		set<K extends keyof T>(key: K, value: T[K]) {
			// @ts-expect-error
			this.emit(key, value);
		}
		get<K extends keyof T>(key: K): T[K] {
			return this.values[key];
		}
	}

	return (values?: Partial<T>): T & TypedEventEmitter<EventMap<T>> => {
		// @ts-expect-error
		return new HookableRecordInternal(values);
	};
}

export type IHookableRecord<T extends Record<string, unknown>> = T &
	TypedEventEmitter<EventMap<T>>;

export default HookableRecord;
