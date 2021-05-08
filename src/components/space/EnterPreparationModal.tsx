import {useCallback, useContext} from 'react';
import {useCurrentUserID} from '../AuthHooks';
import BaseButton from '../base/BaseButton';
import BaseModal from '../base/BaseModal';
import BaseRow from '../base/BaseRow';
import LocalUserPreview from './LocalUserPreview';
import SpaceAudioContext from './SpaceAudioContext';
import VoiceContext from './airwave/VoiceContext';

/**
 * This is a modal shown where you can choose to enable or disable your camera and microphone
 * before entering a Space.
 */
export default function EnterPreparationModal({onCancel}: {onCancel(): void}) {
	const [, setAudioContext] = useContext(SpaceAudioContext);
	const {voiceSDK} = useContext(VoiceContext);
	const userID = useCurrentUserID()!;

	const onReady = useCallback(() => {
		setAudioContext(new AudioContext());
		voiceSDK.setReady(true);
		voiceSDK.connect(userID);
	}, [setAudioContext, userID, voiceSDK]);

	return (
		<BaseModal onClose={() => {}} variant="fitContent" closable={false}>
			<BaseRow direction="column" spacing={2} rails={2} edges={2}>
				<LocalUserPreview />
				<BaseRow direction="row" spacing={1}>
					<BaseButton variant="primary" onClick={onReady}>
						Join
					</BaseButton>
					<BaseButton variant="primary" onClick={onCancel}>
						Cancel
					</BaseButton>
				</BaseRow>
			</BaseRow>
		</BaseModal>
	);
}
