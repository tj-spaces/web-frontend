import { useEffect, useState } from 'react';
import { getSuggestedFriends, sendFriendRequest } from '../api/api';
import { createStylesheet, stylex } from '../styles/createStylesheet';
import InputStyles from '../styles/InputStyles';
import { Friend } from '../typings/Friend';
import AddFriendsListRow from './AddFriendsListRow';
import BaseButton from './Base/BaseButton';
import BaseModal from './Base/BaseModal';
import BaseRow from './Base/BaseRow';
import BaseText from './Base/BaseText';

const styles = createStylesheet({
	largeFont: {
		fontSize: '1.25rem'
	}
});

const suggestionCache: Record<string, Friend[]> = {};

export default function AddFriendsModal({ onClose }: { onClose: () => void }) {
	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState<Friend[]>([]);
	const [requestedFriends, setRequestedFriends] = useState<Record<string, boolean>>({});

	useEffect(() => {
		if (search in suggestionCache) {
			setSearchResults(suggestionCache[search]);
		} else {
			getSuggestedFriends(search).then((suggested) => {
				suggestionCache[search] = suggested;
				setSearchResults(suggested);
			});
		}
	}, [search]);

	return (
		<BaseModal onClickOutside={() => onClose()}>
			<BaseRow direction="column" spacing={1}>
				<BaseText variant="heading" fontSize="large" fontWeight="medium">
					Add Friends
				</BaseText>
				<input
					className={stylex(InputStyles.rectangleInput, styles.largeFont)}
					type="text"
					onChange={(e) => setSearch(e.target.value)}
					value={search}
				/>
				<BaseRow direction="column" height="16rem">
					{searchResults.map((friend) => {
						return (
							<AddFriendsListRow
								friend={friend}
								onClickedAddFriend={() => {
									sendFriendRequest(friend.id);
									setRequestedFriends((requestedFriends) => ({
										...requestedFriends,
										[friend.id]: true
									}));
								}}
								requested={requestedFriends[friend.id] === true}
							/>
						);
					})}
				</BaseRow>
				<BaseButton onClick={() => onClose()}>Done</BaseButton>
			</BaseRow>
		</BaseModal>
	);
}
