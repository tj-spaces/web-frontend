/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useState, useEffect, useContext} from 'react';
import SimulationServerContext from '../components/space/SimulationServerContext';

export default function useMyID() {
	const simulation = useContext(SimulationServerContext);
	const [myID, setMyID] = useState<string>();

	useEffect(() => {
		if (simulation.participantID) {
			setMyID(simulation.participantID);
		}
		simulation.on('authenticated', (participantID) => {
			setMyID(participantID);
		});
	}, [simulation]);

	return myID;
}
