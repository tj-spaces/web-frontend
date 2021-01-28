import { createContext } from 'react';
import * as twilio from 'twilio-video';

const TwilioRoomContext = createContext<twilio.Room | null>(null);

export default TwilioRoomContext;
