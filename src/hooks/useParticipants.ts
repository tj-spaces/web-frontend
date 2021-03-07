import {useContext, useEffect, useState} from 'react';
import SpaceManagerContext from '../components/space/ManagerContext';
import {SpaceParticipant} from '../typings/Space';

export default function useParticipants() {
	const manager = useContext(SpaceManagerContext);
	const [participants, setParticipants] = useState<
		Record<string, SpaceParticipant>
	>({});

	useEffect(() => {
		setParticipants(manager.participants);

		manager
			.on('users', (users) => setParticipants(users))
			.on('user_join', (user) => {
				setParticipants((participants) => ({...participants, [user.id]: user}));
			})
			.on('user_leave', (user) => {
				setParticipants(({[user]: _, ...participants}) => participants);
			})
			.on('user_move', ({id, new_position}) => {
				setParticipants((participants) => ({
					...participants,
					[id]: {...participants[id], position: new_position},
				}));
			})
			.on('user_direction', ({id, direction}) => {
				setParticipants((participants) => ({
					...participants,
					[id]: {...participants[id], moving_direction: direction},
				}));
			});
	}, [manager]);

	return participants;
}
