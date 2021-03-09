/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';

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
