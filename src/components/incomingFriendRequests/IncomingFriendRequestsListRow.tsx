import React from 'react';
import { createStylesheet } from '../../styles/createStylesheet';
import { PublicUserInfo } from '../../typings/PublicUserInfo';
import BaseButton from '../Base/BaseButton';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';

const styles = createStylesheet({
	picture: {
		flex: 1,
		borderRadius: '100%',
		width: '3rem'
	},
	bio: {
		flex: 5
	}
});

export default function IncomingFriendRequestsListRow({
	requester,
	onClickedAcceptRequest,
	acceptedRequest
}: {
	requester: PublicUserInfo;
	onClickedAcceptRequest: () => void;
	acceptedRequest: boolean;
}) {
	return (
		<BaseRow direction="row" alignment="center" spacing={1}>
			<img src={requester.picture} className={styles('picture')} alt={requester.name + "'s profile photo"} />
			<BaseRow direction="column" xstyle={styles.bio} alignment="center" justifyContent="center">
				<BaseText fontSize="medium" fontWeight="bold">
					{requester.name}
				</BaseText>
			</BaseRow>
			{!acceptedRequest ? (
				<BaseButton onClick={() => onClickedAcceptRequest()}>Accept Request</BaseButton>
			) : (
				<BaseText>Friends</BaseText>
			)}
		</BaseRow>
	);
}
