import {useContext} from 'react';
import BaseButton from '../base/BaseButton';
import BaseModal from '../base/BaseModal';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import LocalUserPreview from './LocalUserPreview';
import UserSettingsContext from './UserSettingsContext';

/**
 * This is a modal shown where you can choose to enable or disable your camera and microphone
 * before entering a Space.
 */
export default function EnterPreparationModal({onReady}: {onReady(): void}) {
	const {
		userSettings: {cameraEnabled, micEnabled},
		userSettingsSDK,
	} = useContext(UserSettingsContext);
	return (
		<BaseModal onClose={() => {}} closable={false}>
			<BaseRow direction="row">
				<div style={{flex: 1}}>
					<BaseRow direction="column" spacing={2} rails={2} edges={2}>
						<BaseRow direction="row" spacing={2} alignment="center">
							<input
								type="checkbox"
								onChange={(e) =>
									userSettingsSDK.setCameraEnabled(e.target.checked)
								}
								checked={cameraEnabled}
							/>
							<BaseText variant="list-item-title">Camera</BaseText>
						</BaseRow>
						<BaseRow direction="row" spacing={2} alignment="center">
							<input
								type="checkbox"
								onChange={(e) =>
									userSettingsSDK.setMicEnabled(e.target.checked)
								}
								checked={micEnabled}
							/>
							<BaseText variant="list-item-title">Microphone</BaseText>
						</BaseRow>
						<BaseButton variant="primary" onClick={onReady}>
							Join
						</BaseButton>
					</BaseRow>
				</div>
				<div style={{flex: 1}}>
					<LocalUserPreview />
				</div>
			</BaseRow>
		</BaseModal>
	);
}
