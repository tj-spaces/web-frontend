/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {createContext} from 'react';

/**
 * A context that hides sensitive data if the user is in Streamer Mode (like Discord)
 */
const StreamerModeContext = createContext<boolean>(false);

export default StreamerModeContext;
