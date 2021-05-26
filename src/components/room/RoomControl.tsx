import BaseButton from '@components/base/BaseButton';
import BaseRow from '@components/base/BaseRow';

export default function RoomControl({leaveRoom}: {leaveRoom: () => void}) {
	return (
		<BaseRow direction="row" width="100%">
			<BaseButton variant="negative" onClick={leaveRoom}>
				Leave
			</BaseButton>
		</BaseRow>
	);
}
