import {useState, useEffect, useContext} from 'react';
import SpaceManagerContext from '../components/space/ManagerContext';

export default function useMyID() {
	const manager = useContext(SpaceManagerContext);
	const [myID, setMyID] = useState<string>();

	useEffect(() => {
		manager.on('auth', ({participant_id}) => {
			setMyID(participant_id);
		});
	}, [manager]);

	return myID;
}
