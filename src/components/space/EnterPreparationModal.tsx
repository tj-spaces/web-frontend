import {useContext} from 'react';
import BaseButton from '../base/BaseButton';
import BaseModal from '../base/BaseModal';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import SpaceMediaStateContext from './SpaceMediaStateContext';

/**
 * This is a modal shown where you can choose to enable or disable your camera and microphone
 * before entering a Space.
 */
export default function EnterPreparationModal({
	setCameraEnabled,
	setMicEnabled,
	onReady,
}: {
	setCameraEnabled(enabled: boolean): void;
	setMicEnabled(enabled: boolean): void;
	onReady(): void;
}) {
	const {cameraEnabled, micEnabled} = useContext(SpaceMediaStateContext);
	return (
		<BaseModal onClose={() => {}} closable={false}>
			<BaseRow direction="column" spacing={2}>
				<BaseRow direction="row" spacing={2} alignment="center">
					<input
						type="checkbox"
						onChange={(e) => {
							console.log('Setting cameraEnabled to', e.target.checked);
							setCameraEnabled(e.target.checked);
						}}
						checked={cameraEnabled}
					/>
					<BaseText variant="list-item-title">Camera</BaseText>
				</BaseRow>
				<BaseRow direction="row" spacing={2} alignment="center">
					<input
						type="checkbox"
						onChange={(e) => setMicEnabled(e.target.checked)}
						checked={micEnabled}
					/>
					<BaseText variant="list-item-title">Microphone</BaseText>
				</BaseRow>
				<BaseButton variant="primary" onClick={onReady}>
					Join
				</BaseButton>
			</BaseRow>
		</BaseModal>
	);
}
