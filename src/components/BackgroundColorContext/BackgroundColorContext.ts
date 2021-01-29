import { createContext } from 'react';

const BackgroundColorContext = createContext<'light' | 'dark'>('dark');

export default BackgroundColorContext;
