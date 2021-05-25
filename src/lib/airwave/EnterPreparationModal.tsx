import {useCallback, useContext} from 'react';
import {useCurrentUserID} from '@components/AuthHooks';
import BaseButton from '@components/base/BaseButton';
import BaseModal from '@components/base/BaseModal';
import BaseRow from '@components/base/BaseRow';
import LocalUserPreview from '@components/space/LocalUserPreview';
import GlobalAudioContext from './GlobalAudioContext';
import VoiceContext from './VoiceContext';

/**
 * This is a modal shown where you can choose to enable or disable your camera and microphone
 * before entering a Space.
 */
export default function EnterPreparationModal({onCancel}: {onCancel(): void}) {
	const [, setAudioContext] = useContext(GlobalAudioContext);
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
