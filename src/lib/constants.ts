export const __DEV__ = process.env.NODE_ENV !== 'production';

export const API_SERVER_URL = __DEV__
	? 'http://localhost:5000'
	: 'https://api.joinnebula.co';
export const UI_SERVER_URL = __DEV__
	? 'http://localhost:3000'
	: 'https://www.joinnebula.co';
