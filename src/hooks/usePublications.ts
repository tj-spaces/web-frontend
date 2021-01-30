import { useEffect, useState } from 'react';
import { LocalTrackPublication, Participant, RemoteTrackPublication } from 'twilio-video';

type TrackPublication = LocalTrackPublication | RemoteTrackPublication;

export default function usePublications(participant: Participant | null) {
	const [publications, setPublications] = useState<TrackPublication[]>([]);

	useEffect(() => {
		if (participant) {
			// Reset the publications when the 'participant' variable changes.
			setPublications(Array.from(participant.tracks.values()) as TrackPublication[]);

			const onTrackPublished = (publication: TrackPublication) =>
				setPublications((prevPublications) => [...prevPublications, publication]);
			const onTrackUnpublished = (publication: TrackPublication) =>
				setPublications((prevPublications) => prevPublications.filter((p) => p !== publication));

			participant.on('trackPublished', onTrackPublished);
			participant.on('trackUnpublished', onTrackUnpublished);
			return () => {
				participant.off('trackPublished', onTrackPublished);
				participant.off('trackUnpublished', onTrackUnpublished);
			};
		}
	}, [participant]);

	return publications;
}
