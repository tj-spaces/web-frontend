import React, { useEffect, useState } from 'react';
import useSpace from '../../hooks/useSpace';
import Button from '../Button/Button';
import CurrentSpaceContext from '../CurrentSpaceContext/CurrentSpaceContext';
import Typography from '../Typography/Typography';
import * as io from 'socket.io-client';
import { ISpaceParticipant } from '../../typings/SpaceParticipant';
import { API_SERVER_URL } from '../../lib/constants';
import getSessionId from '../../lib/getSessionId';

export default function Space({ id }: { id: string }) {
	const space = useSpace(id);
	const [participants, setParticipants] = useState(new Map<string, ISpaceParticipant>());

	useEffect(() => {
		const connection = io.connect(API_SERVER_URL + '?sessionId=' + getSessionId());
		connection.emit('join_space', id);

		connection.on('peers', (peers: { [id: string]: ISpaceParticipant }) => {
			let participants = new Map<string, ISpaceParticipant>();

			for (let [id, participant] of Object.entries(peers)) {
				participants.set(id, participant);
			}

			setParticipants(participants);
		});

		connection.on('peer_joined', (peer: ISpaceParticipant) => {
			setParticipants((participants) => {
				participants.set(peer.accountId, peer);
				return participants;
			});
		});

		connection.on('peer_left', (peer: ISpaceParticipant) => {
			setParticipants((participants) => {
				participants.delete(peer.accountId);
				return participants;
			});
		});

		return () => {
			connection.emit('leave_space');
			connection.off('peer_joined');
			connection.off('peer_left');
			connection.off('peers');
		};
	}, [id]);

	return (
		<CurrentSpaceContext.Provider value={id}>
			{space ? (
				<div style={{ height: '100vh' }} className="flex-column padding-2">
					<Typography type="title" alignment="center">
						{space.name}
					</Typography>
					<br />

					<div className="text-center">
						<h2>Here</h2>
						{Array.from(participants.values()).map((participant) => {
							return <span key={participant.accountId}>{participant.displayName}</span>;
						})}
					</div>
					<div className="flex-row">
						<Button to="..">Leave</Button>
					</div>
				</div>
			) : (
				<span>Loading...</span>
			)}
		</CurrentSpaceContext.Provider>
	);
}
