import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';
import CreateInstantSpaceButton from '../CreateInstantSpaceButton';

export default function SpaceFeedEmptyFiller() {
	return (
		<BaseRow direction="column" alignment="center">
			<BaseText variant="heading" fontSize="large">
				There aren't any spaces yet.
			</BaseText>
			<CreateInstantSpaceButton />
		</BaseRow>
	);
}
