import {useCallback, useContext} from 'react';
import {useCurrentUserID} from '../AuthHooks';
import BaseButton from '../base/BaseButton';
import BaseModal from '../base/BaseModal';
import BaseRow from '../base/BaseRow';
import LocalUserPreview from './LocalUserPreview';
import SpaceAudioContext from './SpaceAudioContext';
import VoiceContext from '../../lib/airwave/VoiceContext';

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
		<BaseModal
			onClose={() => {}}
			size="fitContent"
			closable={false}
			backgroundColor="none"
		>
			<BaseRow direction="column" spacing={2} rails={2} edges={2}>
				<LocalUserPreview width="30em" height="20em" />
				<BaseRow direction="row" spacing={1}>
					<BaseButton variant="theme" onClick={onReady}>
						Join
					</BaseButton>
					<BaseButton variant="secondary" onClick={onCancel}>
						Cancel
					</BaseButton>
				</BaseRow>
			</BaseRow>
		</BaseModal>
	);
}
