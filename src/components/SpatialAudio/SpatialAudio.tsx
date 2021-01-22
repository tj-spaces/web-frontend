export const defaultPannerNodeSettings: PannerOptions = {
	panningModel: 'HRTF', // takes into account the human head
	distanceModel: 'linear', // simplest way for sound to get quieter
	coneInnerAngle: 60,
	coneOuterAngle: 90,
	coneOuterGain: 0.3,
	maxDistance: 10000, // Arbitrary units
	refDistance: 1,
	rolloffFactor: 2 // How quickly the sound gets quieter
};

/*
function SpatialAudio({users, myUserID}: SpatialAudioProps) {
	const audioCtx = useRef<AudioContext>(new AudioContext());
	const listener = audioCtx.current.listener;
	
	let myPosition: Spaces.Position = null!;
	let myRotation: Spaces.Rotation = null!;

	users.forEach(user => {
		if (user.userID === myUserID) {
			myPosition = user.position;
			myRotation = user.rotation;
		}
	})

	if (!myPosition || !myRotation) {
		throw new Error(`myUserID [${myUserID}] not found in users [${users}]`);
	}

	// Update the AudioContext Listener whenever my position changes
	useEffect(() => {
		listener.positionX.value = myPosition.x;
		listener.positionY.value = myPosition.y;
		listener.positionZ.value = myPosition.z;
		/*
			The forward properties represent the 3D coordinate position of the listener's forward direction (e.g. the direction they are facing in), while the up properties represent the 3D coordinate position of the top of the listener's head. These two together can nicely set the direction.
		/
		let forward = getForwardFromRotation(myRotation);
		listener.forwardX.value = forward.x + myPosition.x;
		listener.forwardY.value = forward.y + myPosition.y;
		listener.forwardZ.value = forward.z + myPosition.z;
	}, [myPosition, myRotation, listener])
	
	// We don't want to create pannerNodes each time, so we'll use a ref
	const pannerNodes = useRef<Map<string, PannerNode>>({});
	const trackSources = useRef<Map<string, MediaStreamTrackAudioSourceNode>>({});

	useEffect(() => {
		for (let user of users) {
			let userID = user.userID;
			// Check if info has already been instantiated
			if (!(userID in pannerNodes.current)) {
				if (user.track) {
					let trackSource = audioCtx.current.createMediaStreamTrackSource(user.track);
					let pannerNode = createPannerNode(
						audioCtx.current,
						user.position,
						user.rotation
					);
					trackSource.connect(pannerNode).connect(audioCtx.current.destination);
		
					trackSources.current.set(userID, trackSource);
					pannerNodes.current.set(userID, pannerNode);
				}

			} else {
				// If already instantiated, just update the values
				let pannerNode = pannerNodes.current.get(userID);
				Object.assign(pannerNode, pannerNodeFriendlyPositionAndOrientation(user.position, user.rotation));
			}
		}

		const removeUser = (userID: string) => {
			let node = pannerNodes.current.get(userID);
			if (node) {
				node.disconnect();
			}
			pannerNodes.current.delete(userID);
			trackSources.current.delete(userID);
		};
		
		// efficiency: only executes when there is a change in users length
		if (pannerNodes.current.size > users.length) {
			// somebody left, so we should filter through the list of users
			// this is the list of users to clear
			let excess = new Set(pannerNodes.current.keys());

			// every user that is currently here should not be cleared
			users.forEach(user => excess.delete(user.userID));

			// clear the users that were not found
			excess.forEach(removeUser);
		}

		// clear all the users when the component unmounts
		return () => users.forEach(user => removeUser(user.userID));
	}, [users]);

	return null;
}

const mapStateToProps = (state: Spaces.State): SpatialAudioProps => {
	if (!state.space) {
		throw new Error(`Space is not defined when calling SpatialAudio: ${state}`);
	}

	if (!state.userID) {
		throw new Error(`UserID is not defined when calling SpatialAudio: ${state}`);
	}
	
	return {
		users: state.space.users,
		myUserID: state.userID
	}
}

export default connect(mapStateToProps)(SpatialAudio);

*/
