/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useContext, useEffect, useState} from 'react';
import SimulationServerContext from '../components/space/SimulationServerContext';
import {SpaceParticipant} from '../typings/Space';

export default function useParticipants() {
	const simulationServer = useContext(SimulationServerContext);
	const [participants, setParticipants] = useState<
		Record<string, SpaceParticipant>
	>({});

	useEffect(() => {
		setParticipants(simulationServer.participants);

		simulationServer
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
	}, [simulationServer]);

	return participants;
}
