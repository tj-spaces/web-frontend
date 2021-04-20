import BaseButton from '../base/BaseButton';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';

export default function SpaceConnectionErrored() {
	return (
		<BaseRow
			direction="column"
			alignment="center"
			justifyContent="center"
			height="100%"
		>
			<BaseText variant="secondary-title">Couldn't connect. </BaseText>
			<BaseButton variant="positive" onClick={() => window.location.reload()}>
				Retry
			</BaseButton>
		</BaseRow>
	);
}
