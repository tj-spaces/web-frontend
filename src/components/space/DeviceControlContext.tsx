import {createContext} from 'react';

export type IDeviceControlContext = {
	cameraEnabled: boolean;
	micEnabled: boolean;
};

const DeviceControlContext = createContext<IDeviceControlContext>({
	cameraEnabled: false,
	micEnabled: false,
});

export default DeviceControlContext;
