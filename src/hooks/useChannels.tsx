import { useEffect, useState } from 'react';
import { getChannels } from '../api/api';
import { IChannel } from '../typings/Channel';

export default function useChannels(spaceId: number) {
	let [channels, setChannels] = useState<IChannel[]>();

	useEffect(() => {
		getChannels(spaceId).then((channels) => setChannels(channels));
	}, [spaceId]);

	return channels;
}
