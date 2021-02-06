import { createStylesheet } from '../../styles/createStylesheet';
import { Friend } from '../../typings/Friend';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';

const styles = createStylesheet({
	picture: {
		flex: 1,
		borderRadius: '100%'
	},
	bio: {
		flex: 3,
		height: '100%'
	}
});

export default function FriendListRow({ friend }: { friend: Friend }) {
	return (
		<BaseRow direction="row" alignment="center" spacing={1}>
			<img src={friend.picture} className={styles('picture')} alt={friend.name + "'s profile photo"} />
			<BaseRow direction="column" xstyle={styles.bio} alignment="center" justifyContent="center">
				<BaseText fontSize="large" fontWeight="bold">
					{friend.name}
				</BaseText>
			</BaseRow>
		</BaseRow>
	);
}
