import {Updater, mutate} from 'queryshift';
import {useState} from 'react';
import useSocketEventListener from '../../hooks/useSocketEventListener';
import {getLogger} from '../../lib/ClusterLogger';
import {SpaceParticipant} from '../../typings/Space';

const logger = getLogger('space/participants');

/**
 * This attaches to a socket and listens for incoming space participants.
 * This is NOT a hook for space participants: this specifically creates an
 * event listener for space participants. To hook onto space participants, use
 * the context created in <Space/>.
 * @param conn The socket connection to use
 */
export default function useSpaceParticipantsSubscription(
	conn: SocketIOClient.Socket
) {
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
		logger.debug(`Peer joined: ${peer.id}`);
		setParticipants((participants) => ({
			...participants,
			[peer.id]: peer,
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
