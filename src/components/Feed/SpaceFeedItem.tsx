import React from 'react';
import { Link } from 'react-router-dom';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';
import { createStylesheet } from '../../styles/createStylesheet';
import { ISpace } from '../../typings/Space';

const styles = createStylesheet({
	spaceFeedItemIcon: {
		flex: 1,
		marginRight: '1em',
		subSelectors: {
			i: {
				fontSize: '3rem'
			}
		}
	},
	spaceFeedItemContent: {
		flex: 3,
		display: 'flex',
		flexDirection: 'column'
	}
});

export default function SpaceFeedItem({ space }: { space: ISpace }) {
	return (
		<BaseRow
			direction="column"
			borderRadius={1}
			backgroundColor="dark2"
			width="20rem"
			rails={2}
			spacing={1}
			edges={1}
			boxShadow
		>
			<BaseText fontSize="medium" fontWeight="bold">
				<Link to={'/space/' + space.id}>{space.name}</Link>
			</BaseText>
			<BaseRow direction="row">
				<div className={styles('spaceFeedItemIcon')}>
					<i className="fas fa-server"></i>
				</div>
				<div className={styles('spaceFeedItemContent')}>Online: {space.online_count}</div>
			</BaseRow>
		</BaseRow>
	);
}
