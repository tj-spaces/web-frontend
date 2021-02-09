import {createContext, Dispatch, SetStateAction} from 'react';
import {SpaceMessage} from '../../../typings/Space';

/**
 * This context specifies ID of the message a user wants to reply to.
 */
const ReplyToMessageContext = createContext<{
	message: SpaceMessage | null;
	setMessage: Dispatch<SetStateAction<SpaceMessage | null>>;
}>({message: null, setMessage: () => null});

export default ReplyToMessageContext;
