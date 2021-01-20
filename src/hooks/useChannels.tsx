import { useEffect, useState } from 'react';
import { getSpaces } from '../api/api';
import { IChannel } from '../typings/Channel';

export default function useChannels(spaceId: number) {
	let [channels, setChannels] = useState<IChannel[]>();

	useEffect(() => {
		getSpaces(spaceId).then((channels) => setChannels(channels));
	}, [spaceId]);

	return channels;
}
