import {createStylesheet} from '../../styles/createStylesheet';
import {PublicUserInfo} from '../../typings/PublicUserInfo';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';

const styles = createStylesheet({
	picture: {
		flex: 1,
		borderRadius: '100%',
		width: '3rem',
	},
	bio: {
		flex: 5,
	},
	wave: {
		flex: 2,
	},
});

export default function FriendActivityRow({friend}: {friend: PublicUserInfo}) {
	return (
		<BaseRow
			direction="row"
			alignment="center"
			spacing={1}
			rails={1}
			edges={1}
			borderRadius={1}
			width="100%"
			backgroundColor="bgSecondary"
		>
			<img
				src={friend.picture}
				className={styles('picture')}
				alt={friend.name + "'s profile photo"}
			/>
			<BaseRow
				direction="column"
				xstyle={styles.bio}
				alignment="center"
				justifyContent="center"
			>
				<BaseText variant="body-bold" alignment="center">
					{friend.name}
				</BaseText>
				{/* <BaseText variant="body-semibold">Online</BaseText> */}
			</BaseRow>
			<BaseRow
				direction="column"
				xstyle={styles.wave}
				alignment="center"
				justifyContent="center"
			>
				Wave
			</BaseRow>
		</BaseRow>
	);
}
