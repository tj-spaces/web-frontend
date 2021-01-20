import { ISpace } from '../../typings/Space';
import Flexbox from '../Flexbox/Flexbox';
import SpaceListItem from '../SpaceListItem/SpaceListItem';

export default function SpaceList({ spaces }: { spaces: ISpace[] | undefined }) {
	if (spaces == null) {
		return <h1>Loading...</h1>;
	}

	console.log(spaces);

	return (
		<Flexbox direction="column">
			{spaces.map(({ id, name }) => (
				<SpaceListItem key={id} name={name} id={id} />
			))}
		</Flexbox>
	);
}
