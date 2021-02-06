import React from 'react';
import { createStylesheet } from '../../styles/createStylesheet';
import { SpaceSession } from '../../typings/SpaceSession';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';
import SpaceFeedEmptyFiller from './SpaceFeedEmptyFiller';
import SpaceFeedItem from './SpaceFeedItem';

const styles = createStylesheet({
	createInstantSpaceButtonWrapper: {
		position: 'absolute',
		bottom: '10vh',
		margin: '0 auto',
		fontSize: '1.25rem'
	}
});

export default function SpaceFeed({ spaces }: { spaces: SpaceSession[] }) {
	return (
		<BaseRow direction="column" spacing={1} width="100%" alignment="center">
			<BaseText variant="heading" fontWeight="bold" fontSize="xl" alignment="center">
				Explore
			</BaseText>

			{spaces.length > 0 ? (
				spaces.map((space) => <SpaceFeedItem space={space} key={space.id} />)
			) : (
				<SpaceFeedEmptyFiller />
			)}

			<div className={styles('createInstantSpaceButtonWrapper')}></div>
		</BaseRow>
	);
}
