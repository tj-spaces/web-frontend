export const __DEV__ = process.env.NODE_ENV !== 'production';

export const API_SERVER_URL = __DEV__ ? 'http://localhost:5000/' : 'http://spaces-api-999.sites.tjhsst.edu';
export const UI_SERVER_URL = __DEV__ ? 'http://localhost:3000/' : 'http://spaces.sites.tjhsst.edu';
