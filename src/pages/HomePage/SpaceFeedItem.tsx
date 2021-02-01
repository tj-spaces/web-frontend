import React from 'react';
import BaseRow from '../../components/Base/BaseRow';
import BaseText from '../../components/Base/BaseText';
import { createStylesheet } from '../../styles/createStylesheet';
import { ISpace } from '../../typings/Space';

const styles = createStylesheet({
	spaceFeedItemIcon: {
		textAlign: 'right',
		padding: '0rem 2rem',
		marginLeft: '2rem',
		subSelectors: {
			i: {
				fontSize: '3rem'
			}
		}
	},
	spaceFeedItemContent: {
		display: 'flex',
		flexDirection: 'column'
	}
});

export default function SpaceFeedItem({ space }: { space: ISpace }) {
	return (
		<BaseRow borderRadius={2} backgroundColor="dark0" rails={2}>
			<div className={styles.spaceFeedItemIcon}>
				<i className="fas fa-globe"></i>
			</div>
			<div className={styles.spaceFeedItemContent}>
				<BaseText fontSize="large">{space.name}</BaseText>
				Online: {space.online_count}
			</div>
		</BaseRow>
	);
}
