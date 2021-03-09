/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/

import {createStylesheet} from '../../styles/createStylesheet';
import {Space} from '../../typings/Space';
import BaseRow from '../base/BaseRow';
import FeedEmptyFiller from './FeedEmptyFiller';
import SpaceFeedItem from './SpaceFeedItem';

const styles = createStylesheet({
	createInstantSpaceButtonWrapper: {
		position: 'absolute',
		bottom: '10vh',
		margin: '0 auto',
		fontSize: '1.25rem',
	},
});

/**
 * Renders a list of feed items.
 */
export default function Feed({spaces}: {spaces: Space[]}) {
	return (
		<BaseRow direction="column" spacing={1} width="100%" alignment="center">
			{spaces.length > 0 ? (
				spaces.map((space) => <SpaceFeedItem space={space} key={space.id} />)
			) : (
				<FeedEmptyFiller />
			)}

			<div className={styles('createInstantSpaceButtonWrapper')}></div>
		</BaseRow>
	);
}
