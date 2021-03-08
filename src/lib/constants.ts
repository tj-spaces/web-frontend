export const __DEV__ = false; //process.env.NODE_ENV !== 'production';

export const API_SERVER_URL = __DEV__
	? 'http://localhost:5000'
	: 'http://api.joinnebula.co';
export const UI_SERVER_URL = __DEV__
	? 'http://localhost:3000'
	: 'http://www.joinnebula.co';
export const SIM_SERVER_URL = 'ws://localhost:7000';
