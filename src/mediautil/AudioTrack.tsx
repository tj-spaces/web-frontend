import {
	AudioTrack as TwilioAudioTrack,
	AudioTrackPublication,
} from 'twilio-video';
import useMediaStreamTrack from '../hooks/useMediaStreamTrack';
import useTrack from '../hooks/useTrack';

export default function AudioTrack({
	publication,
}: {
	publication?: AudioTrackPublication;
}) {
	const audioTrack = useTrack(publication) as TwilioAudioTrack;
	const mediaStreamTrack = useMediaStreamTrack(audioTrack);

	return (
		<audio
			ref={(ref) => {
				if (mediaStreamTrack && ref) {
					ref.srcObject = new MediaStream([mediaStreamTrack]);
				}
			}}
		/>
	);
}
