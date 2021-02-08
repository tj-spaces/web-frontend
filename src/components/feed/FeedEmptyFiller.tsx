import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';

/**
 * Renders text for when the feed is empty.
 */
export default function FeedEmptyFiller() {
	return (
		<BaseRow direction="column" alignment="center">
			<BaseText variant="secondary-title">
				There aren't any spaces yet.
			</BaseText>
		</BaseRow>
	);
}
