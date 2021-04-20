import {createContext} from 'react';
import LocalDevicesSDK, {LocalDevicesState} from './LocalDevicesSDK';

export type LocalDevicesContextProps = {
	localDevicesState: LocalDevicesState;
	localDevicesSDK: LocalDevicesSDK;
};

const LocalDevicesContext = createContext<LocalDevicesContextProps>({
	localDevicesSDK: new LocalDevicesSDK(),
	localDevicesState: new LocalDevicesState(),
});

export default LocalDevicesContext;
