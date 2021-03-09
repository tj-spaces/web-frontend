/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
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
