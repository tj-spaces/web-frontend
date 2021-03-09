/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
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
