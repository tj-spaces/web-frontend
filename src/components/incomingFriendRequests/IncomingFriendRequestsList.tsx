/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useState} from 'react';
import {acceptFriendRequest} from '../../api/friends';
import {PublicUserInfo} from '../../typings/PublicUserInfo';
import BaseRow from '../base/BaseRow';
import IncomingFriendRequestsListRow from './IncomingFriendRequestsListRow';

/**
 * A list view that shows the incoming friend requests. Logic for accepting friend requests
 * is called from here directly. This also stores an internal map of which friend requests
 * have been accepted.
 */
export default function IncomingFriendRequestsList({
	requests,
}: {
	requests: PublicUserInfo[];
}) {
	let [acceptedRequests, setAcceptedRequests] = useState<
		Record<string, boolean>
	>({});
	return (
		<BaseRow direction="column">
			{requests.map((requester) => {
				return (
					<IncomingFriendRequestsListRow
						requester={requester}
						key={requester.id}
						onClickedAcceptRequest={() => {
							acceptFriendRequest(requester.id);
							setAcceptedRequests((a) => ({...a, [requester.id]: true}));
						}}
						acceptedRequest={acceptedRequests[requester.id] === true}
					/>
				);
			})}
		</BaseRow>
	);
}
