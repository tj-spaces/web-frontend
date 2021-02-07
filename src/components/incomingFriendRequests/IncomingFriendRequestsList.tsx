import { useState } from 'react';
import { acceptFriendRequest } from '../../api/api';
import { PublicUserInfo } from '../../typings/PublicUserInfo';
import BaseRow from '../Base/BaseRow';
import IncomingFriendRequestsListRow from './IncomingFriendRequestsListRow';

export default function IncomingFriendRequestsList({ requests }: { requests: PublicUserInfo[] }) {
	let [acceptedRequests, setAcceptedRequests] = useState<Record<string, boolean>>({});
	return (
		<BaseRow direction="column">
			{requests.map((requester) => {
				return (
					<IncomingFriendRequestsListRow
						requester={requester}
						key={requester.id}
						onClickedAcceptRequest={() => {
							acceptFriendRequest(requester.id);
							setAcceptedRequests((a) => {
								return { ...a, [requester.id]: true };
							});
						}}
						acceptedRequest={acceptedRequests[requester.id] === true}
					/>
				);
			})}
		</BaseRow>
	);
}
