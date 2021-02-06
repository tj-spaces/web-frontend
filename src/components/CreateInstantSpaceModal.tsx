import { useState } from 'react';
import { backgroundColors } from '../styles/colors';
import InputStyles from '../styles/InputStyles';
import BaseButton from './Base/BaseButton';
import BaseButtonGroupItem from './Base/BaseButtonGroupItem';
import BaseModal from './Base/BaseModal';
import BaseRow from './Base/BaseRow';
import BaseText from './Base/BaseText';

export type InstantSpaceVisibilityType = 'discoverable' | 'unlisted';

export default function CreateInstantSpaceModal({ onClose }: { onClose: () => void }) {
	let [visibility, setVisibility] = useState<InstantSpaceVisibilityType>('discoverable');
	let [topic, setTopic] = useState<string>('');

	return (
		<BaseModal onClickOutside={onClose}>
			<BaseRow direction="column" spacing={1}>
				<BaseText variant="heading" fontSize="large" fontWeight="medium">
					Start a conversation
				</BaseText>
				Topic
				<input
					className={InputStyles('rectangleInput')}
					style={{ fontSize: '2rem', width: '100%' }}
					onChange={(ev) => setTopic(ev.target.value)}
					value={topic}
				/>
				Visibility
				<BaseRow direction="row">
					<BaseButtonGroupItem
						classes={visibility === 'discoverable' && backgroundColors.red}
						onClick={() => setVisibility('discoverable')}
					>
						Discoverable
					</BaseButtonGroupItem>
					<BaseButtonGroupItem
						classes={visibility === 'unlisted' && backgroundColors.red}
						onClick={() => setVisibility('unlisted')}
					>
						Unlisted
					</BaseButtonGroupItem>
				</BaseRow>
				<BaseButton variant="theme" size="small">
					Start
				</BaseButton>
			</BaseRow>
		</BaseModal>
	);
}
