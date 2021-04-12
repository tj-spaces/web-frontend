/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, April 2021.
*/
import {createContext} from 'react';

/**
 * This context is used to share the result of the getUserMedia() request.
 */
const LocalWebcamContext = createContext<MediaStream | null>(null);

export default LocalWebcamContext;
