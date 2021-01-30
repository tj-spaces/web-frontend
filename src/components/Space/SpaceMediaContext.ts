import { createContext } from 'react';
import { LocalVideoTrack, Participant } from 'twilio-video';

export type ISpaceMediaContext = {
	localVideoTrack: LocalVideoTrack | null;
	setMuted: (muted: boolean) => void;
	setCameraEnabled: (cameraEnabled: boolean) => void;
	cameraEnabled: boolean;
	muted: boolean;
	twilioParticipants: Record<string, Participant>;
};

const SpaceMediaContext = createContext<ISpaceMediaContext | null>(null);

export default SpaceMediaContext;
