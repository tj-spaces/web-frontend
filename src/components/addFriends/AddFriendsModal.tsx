import React, {useEffect, useState} from 'react';
import {getSuggestedFriends} from '../../api/friends';
import {createStylesheet, stylex} from '../../styles/createStylesheet';
import InputStyles from '../../styles/InputStyles';
import {PublicUserInfo} from '../../typings/PublicUserInfo';
import BaseButton from '../base/BaseButton';
import BaseModal from '../base/BaseModal';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import AddFriendsList from './AddFriendsList';

const styles = createStylesheet({
	largeFont: {
		fontSize: '1.25rem',
	},
});

const suggestionCache: Record<string, PublicUserInfo[]> = {};

export default function AddFriendsModal({onClose}: {onClose: () => void}) {
	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState<PublicUserInfo[]>([]);

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
		<BaseModal onClose={() => onClose()}>
			<BaseRow direction="column" spacing={1}>
				<BaseText variant="secondary-title">Add Friends</BaseText>
				<input
					className={stylex(InputStyles.rectangleInput, styles.largeFont)}
					type="text"
					onChange={(e) => setSearch(e.target.value)}
					value={search}
				/>
				<AddFriendsList suggestedFriends={searchResults} />
				<BaseButton onClick={() => onClose()}>Done</BaseButton>
			</BaseRow>
		</BaseModal>
	);
}
