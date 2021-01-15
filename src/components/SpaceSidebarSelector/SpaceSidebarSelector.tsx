import { ISpace } from '../../typings/Space';
import Flexbox from '../Flexbox/Flexbox';
import SpaceSidebarSelectorItem from '../SpaceSidebarSelectorItem/SpaceSidebarSelectorItem';

export default function SpaceSidebarSelector({
	spaces,
	activeSpace,
	setActiveSpace
}: {
	spaces: ISpace[];
	activeSpace?: number;
	setActiveSpace: (spaceId: number) => any;
}) {
	return (
		<Flexbox direction="column">
			{spaces.map((space) => (
				<SpaceSidebarSelectorItem
					space={space}
					isActive={space.id === activeSpace}
					setActiveSpace={setActiveSpace}
				/>
			))}
		</Flexbox>
	);
}
