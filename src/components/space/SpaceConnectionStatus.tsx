import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {useConnectionState} from './simulation/SimulationHooks';
import SpaceConnectionFailed from './SpaceConnectionErrored';

export default function SpaceConnectionStatus() {
	const status = useConnectionState();

	if (status === 'connected') {
		return null;
	}

	console.log(status);

	return (
		<BaseRow
			direction="column"
			alignment="center"
			justifyContent="center"
			height="100%"
		>
			{status === 'connecting' ? (
				<BaseText variant="primary-title">Connecting</BaseText>
			) : (
				<SpaceConnectionFailed />
			)}
		</BaseRow>
	);
}
