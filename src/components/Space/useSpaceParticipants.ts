import {Updater, mutate} from 'queryshift';
import {useState} from 'react';
import useSocketEventListener from '../../hooks/useSocketEventListener';
import {getLogger} from '../../lib/ClusterLogger';
import {SpaceParticipant} from '../../typings/Space';

const logger = getLogger('space/participants');

export default function useSpaceParticipants(conn: SocketIOClient.Socket) {
	const [participants, setParticipants] = useState<
		Record<string, SpaceParticipant>
	>({});

	useSocketEventListener(
		conn,
		'peers',
		(peers: Record<string, SpaceParticipant>) => {
			logger.debug(`Received peer list: ${Object.keys(peers).length} peers`);
			setParticipants(peers);
		}
	);

	useSocketEventListener(conn, 'peer_joined', (peer: SpaceParticipant) => {
		logger.debug(`Peer joined: ${peer.accountId}`);
		setParticipants((participants) => ({
			...participants,
			[peer.accountId]: peer,
		}));
	});

	useSocketEventListener(conn, 'peer_left', (peerId: string) => {
		logger.debug(`Peer left: ${peerId}`);
		setParticipants((participants) => {
			let newParticipants = {...participants};
			delete newParticipants[peerId];
			return newParticipants;
		});
	});

	useSocketEventListener(
		conn,
		'peer_update',
		(peerId: string, updates: Updater<SpaceParticipant>) => {
			setParticipants((participants) => ({
				...participants,
				[peerId]: mutate(participants[peerId], updates),
			}));
		}
	);

	return participants;
}
