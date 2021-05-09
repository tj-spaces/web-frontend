import BaseButton from '../base/BaseButton';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {useReconnect} from './simulation/SimulationHooks';

export default function SpaceConnectionFailed() {
	const reconnect = useReconnect();
	return (
		<BaseRow
			direction="column"
			alignment="center"
			justifyContent="center"
			height="100%"
		>
			<BaseText variant="primary-title">Couldn't connect.</BaseText>
			<BaseButton variant="positive" onClick={reconnect}>
				Retry
			</BaseButton>
		</BaseRow>
	);
}
