import React from 'react';
import {useState, useEffect, useCallback} from 'react';
import {getFriendsList} from '../../api/friends';
import {FetchStatus} from '../../api/FetchStatus';
import {createStylesheet} from '../../styles/createStylesheet';
import {PublicUserInfo} from '../../typings/PublicUserInfo';
import BaseRow from '../base/BaseRow';
import LazyStream from '../LazyStream';
import UserListRow from '../UserListRow';

const styles = createStylesheet({
	friendActivity: {
		maxWidth: '20rem',
	},
});

/**
 * Controller that fetches data about the user's friend activity and renders them in a <FriendActivityList/>
 */
export default function FriendActivity() {
	let [fetchStatus, setFetchStatus] = useState<FetchStatus>(null);
	let [nextKey, setNextKey] = useState<string>('0');
	let [friends, setFriends] = useState<PublicUserInfo[]>([]);

	const fetchMore = useCallback(() => {
		if (nextKey != null) {
			setFetchStatus('loading');
			getFriendsList(nextKey)
				.then(({data, paging}) => {
					setFetchStatus('loaded');
					setFriends((friends) => friends.concat(data));
					setNextKey(paging.after);
				})
				.catch(() => {
					setFetchStatus('errored');
				});
		}
	}, [nextKey]);

	useEffect(() => {
		fetchMore();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<LazyStream
			fetchStatus={fetchStatus}
			onReachEnd={() => fetchMore()}
			xstyle={styles.friendActivity}
		>
			<BaseRow direction="column" alignment="center" spacing={1} edges={1}>
				{friends.map((friend) => (
					<UserListRow user={friend} key={friend.id} />
				))}
			</BaseRow>
		</LazyStream>
	);
}
