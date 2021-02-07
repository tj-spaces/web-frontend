import {useState} from 'react';
import {acceptFriendRequest} from '../../api/api';
import {PublicUserInfo} from '../../typings/PublicUserInfo';
import BaseRow from '../Base/BaseRow';
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
