import React from 'react';
import { IChannel } from '../../typings/Channel';
import ChannelContext from '../ChannelIdContext/ChannelContext';

interface ChannelContainerState {
	activeChannelId: number | null;
	channels: IChannel[];
}

export default class ChannelContainer extends React.Component {
	state: ChannelContainerState = {
		activeChannelId: null,
		channels: []
	};

	setChannel(channelId: number) {
		this.setState({
			channelId
		});
	}

	render() {
		return (
			<ChannelContext.Provider
				value={{
					activeChannelId: this.state.activeChannelId,
					channels: this.state.channels
				}}
			></ChannelContext.Provider>
		);
	}
}
