import { createContext } from 'react';
import { IChannel } from '../../typings/Channel';

export interface IChannelContext {
	activeChannelId: number | null;
	channels: IChannel[];
}

const ChannelContext = createContext<IChannelContext>(null!);

export default ChannelContext;
