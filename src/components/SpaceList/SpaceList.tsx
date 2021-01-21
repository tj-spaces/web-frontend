import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ISpace } from '../../typings/Space';
import CurrentClusterContext from '../CurrentClusterContext/CurrentClusterContext';

import './SpaceList.sass';
import '../../styles/box.sass';

export default function SpaceList({ spaces = [] }: { spaces?: ISpace[] }) {
	const cluster = useContext(CurrentClusterContext);

	return (
		<div className="space-list">
			{spaces.map((space) => (
				<div
					className="hoverable-light-box foreground-color-muted column-item"
					style={{ height: '5em', fontSize: '1.25em' }}
				>
					<b>
						<Link to={`/clusters/${cluster.id}/spaces/${space.id}`} className="unstyled-link">
							{space.name}
						</Link>
					</b>
				</div>
			))}
		</div>
	);
}
