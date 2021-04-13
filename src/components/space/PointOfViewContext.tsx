import {createContext} from 'react';

export type PointOfView = 'third-person' | 'first-person';

const PointOfViewContext = createContext<PointOfView>('first-person');

export default PointOfViewContext;
