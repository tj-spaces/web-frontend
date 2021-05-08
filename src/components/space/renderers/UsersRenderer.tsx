import {useContext} from 'react';
import PointOfViewContext from '../PointOfViewContext';
import {useMyAnonymousID, useParticipants} from '../simulation/SimulationHooks';
import UserModel from './UserModel';

export default function SpaceUserRendererRoot() {
	const myID = useMyAnonymousID();
	const participants = useParticipants();

	const pov = useContext(PointOfViewContext);

	const shouldShowSelf = pov === 'third-person';

	return (
		<>
			{Object.entries(participants.toJSON()).map(([id, participant]) => {
				if (id !== myID || shouldShowSelf) {
					return (
						<UserModel
							position={participant.position}
							rotation={participant.rotation}
							key={id}
							me={id === myID}
							id={id}
						/>
					);
				} else {
					return null;
				}
			})}
		</>
	);
}
