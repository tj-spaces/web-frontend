import {useState, useEffect, useCallback} from 'react';
import {getFriendsList} from '../../api/api';
import {FetchStatus} from '../../api/FetchStatus';
import {PublicUserInfo} from '../../typings/PublicUserInfo';
import LazyStream from '../LazyStream';
import FriendActivityList from './FriendActivity';

/**
 * Controller that fetches data about the user's friend activity and renders them in a <FriendActivityList/>
 */
export default function FriendActivityListContainer() {
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
			fetching={fetchStatus !== 'loaded' && fetchStatus !== 'errored'}
			onReachEnd={() => fetchMore()}
		>
			<FriendActivityList friends={friends} />;
		</LazyStream>
	);
}
