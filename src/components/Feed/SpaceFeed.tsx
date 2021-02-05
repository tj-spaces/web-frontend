import React from 'react';
import { createStylesheet } from '../../styles/createStylesheet';
import { ISpace } from '../../typings/Space';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';
import SpaceFeedItem from './SpaceFeedItem';

const styles = createStylesheet({
	createInstantSpaceButtonWrapper: {
		position: 'absolute',
		bottom: '10vh',
		margin: '0 auto',
		fontSize: '1.25rem'
	}
});

export default function SpaceFeed({ spaces }: { spaces: ISpace[] }) {
	return (
		<BaseRow direction="column" spacing={1} width="100%" alignment="center">
			<BaseText variant="heading" fontWeight="bold" fontSize="xl" alignment="center">
				Explore
			</BaseText>
			{spaces.map((space) => (
				<SpaceFeedItem space={space} key={space.id} />
			))}

			<div className={styles('createInstantSpaceButtonWrapper')}></div>
		</BaseRow>
	);
}
