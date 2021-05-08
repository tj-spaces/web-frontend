import {useState} from 'react';
import {createStylesheet} from '../../styles/createStylesheet';
import BaseButton from '../base/BaseButton';
import BaseRow from '../base/BaseRow';
import ChatModal from './chatModal/ChatModal';
import DeviceControlButtons from './DeviceControlButtons';

const styles = createStylesheet({
	footer: {
		backgroundColor: 'var(--bg-secondary)',

		height: '5em',
		position: 'absolute',
		bottom: '0px',
		left: '0px',
		right: '0px',

		zIndex: 0,
	},
});

export default function SpaceFooter() {
	const [chatModalOpen, setChatModalOpen] = useState(false);

	return (
		<BaseRow
			direction="row"
			justifyContent="center"
			alignment="center"
			spacing={1}
			rails={2}
			xstyle={styles.footer}
		>
			<BaseButton onClick={() => setChatModalOpen(true)}>Chat</BaseButton>

			{chatModalOpen && <ChatModal onClose={() => setChatModalOpen(false)} />}

			<BaseButton to="..">Leave</BaseButton>

			<DeviceControlButtons />
		</BaseRow>
	);
}
