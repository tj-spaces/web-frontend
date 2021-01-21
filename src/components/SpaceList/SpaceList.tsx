import { ISpace } from '../../typings/Space';
import SpaceCreateButton from '../SpaceCreateButton/SpaceCreateButton';
import SpaceListItem from '../SpaceListItem/SpaceListItem';
import './SpaceList.sass';

export default function SpaceList({ spaces }: { spaces: ISpace[] | undefined }) {
	if (spaces == null) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className="space-list">
			<SpaceCreateButton />
			{spaces.map((space) => (
				<SpaceListItem key={space.id} space={space} />
			))}
		</div>
	);
}
