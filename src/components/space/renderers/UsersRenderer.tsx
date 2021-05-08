import {useContext} from 'react';
import PointOfViewContext from '../PointOfViewContext';
import {useMyAnonymousID, useParticipants} from '../simulation/SimulationHooks';
import UserModel from './UserModel';

export default function UsersRenderer() {
	const myID = useMyAnonymousID();
	const participants = useParticipants();

	const pov = useContext(PointOfViewContext);

	const shouldShowSelf = pov === 'third-person';

	return (
		<>
			{Object.entries(participants.toJSON()).map(([id, participant]) => {
				if (id !== myID || shouldShowSelf) {
					return (
						<UserModel participant={participant} key={id} me={id === myID} />
					);
				} else {
					return null;
				}
			})}
		</>
	);
}
