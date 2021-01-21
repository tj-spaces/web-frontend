import React from 'react';
import useSpace from '../../hooks/useSpace';
import Button from '../Button/Button';
import CurrentSpaceContext from '../CurrentSpaceContext/CurrentSpaceContext';
import Typography from '../Typography/Typography';

export default function Space({ id }: { id: string }) {
	const space = useSpace(id);
	return (
		<CurrentSpaceContext.Provider value={id}>
			{space ? (
				<>
					<Typography type="title" alignment="center">
						{space.name}
					</Typography>
					<br />

					<Button to="..">Back</Button>
				</>
			) : (
				<span>Loading...</span>
			)}
		</CurrentSpaceContext.Provider>
	);
}
