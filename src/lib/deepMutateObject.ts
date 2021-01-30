export type NestedPartial<T> = {
	[P in keyof T]?: NestedPartial<T[P]>;
};

export function deepMutateObject<T>(object: T, updates: NestedPartial<T>): T {
	for (let [key, value] of Object.entries(updates)) {
		// @ts-ignore
		if (typeof object[key] === 'object') {
			// @ts-ignore
			deepMutateObject(object[key], value);
		} else {
			// @ts-ignore
			object[key] = value;
		}
	}
	return object;
}
