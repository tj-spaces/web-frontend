export type Listener<S> = (newState: S) => void;

export default class SDKBase<State> {
	private listeners = new Set<Listener<State>>();
	private _state = this.getInitialState();

	getInitialState(): State {
		throw new Error('getInitialState is not implemented');
	}

	protected set state(newValue: State) {
		this._state = newValue;
		this.emitChange();
	}

	protected get state() {
		return this._state;
	}

	private emitChange() {
		this.listeners.forEach((listener) => listener(this.state));
	}

	addListener(listener: Listener<State>) {
		this.listeners.add(listener);
		return {
			remove: () => {
				this.listeners.delete(listener);
			},
		};
	}
}
