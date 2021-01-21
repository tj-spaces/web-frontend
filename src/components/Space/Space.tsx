import React from 'react';
import { ISpace } from '../../typings/Space';
import Button from '../Button/Button';
import SpaceIdContext from '../SpaceIdContext/SpaceIdContext';
import Typography from '../Typography/Typography';

export default function Space({ space }: { space: ISpace }) {
	return (
		<SpaceIdContext.Provider value={space.id}>
			<Typography type="title" alignment="center">
				{space.name}
			</Typography>
			<br />

			<Button to="..">Back</Button>
		</SpaceIdContext.Provider>
	);
}
