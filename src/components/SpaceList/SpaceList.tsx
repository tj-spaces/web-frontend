import { ISpace } from '../../typings/Space';
import Box from '../Box/Box';
import SpaceListItem from '../SpaceListItem/SpaceListItem';

export default function SpaceList({ spaces }: { spaces: ISpace[] | undefined }) {
	if (spaces == null) {
		return <h1>Loading...</h1>;
	}

	return (
		<Box display="flex-column">
			{spaces.map(({ id, name }) => (
				<SpaceListItem key={id} name={name} id={id} />
			))}
		</Box>
	);
}
