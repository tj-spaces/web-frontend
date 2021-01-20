import { createRef, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createSpace } from '../../api/api';
import ClusterCurrentClusterContext from '../ClusterCurrentClusterContext/ClusterCurrentClusterContext';

export default function SpaceCreateButton() {
	const spaceNameRef = createRef<HTMLInputElement>();

	const clusterId = useContext(ClusterCurrentClusterContext);
	const [isSpaceCreating, setIsSpaceCreating] = useState<boolean>(false);
	const [isSpaceCreated, setIsSpaceCreated] = useState<boolean>(false);
	const [newlyCreatedSpaceId, setNewlyCreatedSpaceId] = useState<string>();

	function create() {
		if (spaceNameRef.current) {
			const spaceName = spaceNameRef.current.value;

			setIsSpaceCreating(true);
			createSpace(clusterId!, spaceName).then((newSpaceId) => {
				setNewlyCreatedSpaceId(newSpaceId);
				setIsSpaceCreated(true);
			});
		}
	}

	if (isSpaceCreated && newlyCreatedSpaceId) {
		return <Redirect to={`/cluster/${clusterId}/space/${newlyCreatedSpaceId}`} />;
	}

	return (
		<div>
			{isSpaceCreating ? (
				<span>Creating space...</span>
			) : (
				<>
					<input ref={spaceNameRef} type="text"></input>
					<button onClick={() => create()}>Add a Space</button>
				</>
			)}
		</div>
	);
}
