/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {createStylesheet} from '../styles/createStylesheet';
import {PublicUserInfo} from '../typings/PublicUserInfo';
import BaseRow from './base/BaseRow';
import BaseText from './base/BaseText';

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
		flex: 1,
	},
	userListRow: {
		maxWidth: '24rem',
	},
});

export default function UserListRow({user}: {user: PublicUserInfo}) {
	return (
		<BaseRow
			direction="row"
			alignment="center"
			spacing={1}
			rails={1}
			edges={1}
			borderRadius={1}
			xstyle={styles.userListRow}
			backgroundColor="bgSecondary"
		>
			<img src={user.picture} className={styles('picture')} alt={user.name} />
			<BaseRow
				direction="column"
				xstyle={styles.bio}
				alignment="center"
				justifyContent="center"
			>
				<BaseText variant="body-bold" alignment="center">
					{user.name}
				</BaseText>
				<BaseText variant="body-semibold">Online in unlisted space</BaseText>
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
