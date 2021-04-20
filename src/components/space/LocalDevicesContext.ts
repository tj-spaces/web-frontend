import {createContext} from 'react';
import LocalDevicesSDK from './LocalDevicesSDK';
import LocalDevicesState from './LocalDevicesState';

export type LocalDevicesContextProps = {
	localDevicesState: LocalDevicesState;
	localDevicesSDK: LocalDevicesSDK;
};

const LocalDevicesContext = createContext<LocalDevicesContextProps>({
	localDevicesSDK: new LocalDevicesSDK(),
	localDevicesState: new LocalDevicesState(),
});

export default LocalDevicesContext;
