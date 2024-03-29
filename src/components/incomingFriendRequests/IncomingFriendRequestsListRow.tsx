/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {createStylesheet} from '../../styles/createStylesheet';
import {PublicUserInfo} from '../../typings/PublicUserInfo';
import BaseButton from '../base/BaseButton';
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
});

/**
 * A list view item that renders an incoming friend request.
 * This accepts a callback for when the button to accept a friend request has been clicked.
 * This item does not store the state of the friend request.
 */
export default function IncomingFriendRequestsListRow({
	requester,
	onClickedAcceptRequest,
	acceptedRequest,
}: {
	requester: PublicUserInfo;
	onClickedAcceptRequest: () => void;
	acceptedRequest: boolean;
}) {
	return (
		<BaseRow direction="row" alignment="center" spacing={1}>
			<img
				src={requester.picture}
				className={styles('picture')}
				alt={requester.name + "'s profile photo"}
			/>
			<BaseRow
				direction="column"
				xstyle={styles.bio}
				alignment="center"
				justifyContent="center"
			>
				<BaseText variant="body-bold">{requester.name}</BaseText>
			</BaseRow>
			{!acceptedRequest ? (
				<BaseButton onClick={() => onClickedAcceptRequest()}>
					Accept Request
				</BaseButton>
			) : (
				<BaseText>Friends</BaseText>
			)}
		</BaseRow>
	);
}
