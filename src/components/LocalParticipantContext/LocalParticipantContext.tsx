import { createContext } from 'react';
import * as twilio from 'twilio-video';

const LocalParticipantContext = createContext<twilio.LocalParticipant | null>(null);

export default LocalParticipantContext;
