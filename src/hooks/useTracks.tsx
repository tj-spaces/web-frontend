import { useCallback, useEffect, useState } from 'react';
import * as twilio from 'twilio-video';

export default function useTracks(participant: twilio.Participant) {
	const [publications, setPublications] = useState<twilio.TrackPublication[]>([]);

	const [audioTrack, setAudioTrack] = useState<twilio.AudioTrackPublication>();
	const [videoTrack, setVideoTrack] = useState<twilio.VideoTrackPublication>();

	useEffect(() => {
		if (participant) {
			setPublications(Array.from(participant.tracks.values()));

			const publicationAdded = (publication: twilio.TrackPublication) => {
				setPublications((prevPublications) => [...prevPublications, publication]);
			};

			const publicationRemoved = (publication: twilio.TrackPublication) => {
				setPublications((prevPublications) => prevPublications.filter((p) => p !== publication));
			};

			participant.on('trackPublished', publicationAdded);
			participant.on('trackUnpublished', publicationRemoved);
			return () => {
				participant.off('trackPublished', publicationAdded);
				participant.off('trackUnpublished', publicationRemoved);
			};
		}
	}, [participant]);

	const refreshPublications = useCallback(() => {
		for (let i = 0; i < publications.length && (audioTrack == null || videoTrack == null); i++) {
			let publication = publications[i] as twilio.RemoteTrackPublication | twilio.LocalTrackPublication;
			if (publication.kind === 'audio' && audioTrack == null) {
				setAudioTrack(publication as twilio.AudioTrackPublication);
			} else if (publication.kind === 'video' && videoTrack == null) {
				setVideoTrack(publication as twilio.VideoTrackPublication);
			}
		}
	}, [publications, audioTrack, videoTrack]);

	useEffect(() => {
		refreshPublications();
	}, [refreshPublications]);

	return { audioTrack, videoTrack };
}
