import { createRef, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createSpace } from '../../api/api';
import Button from '../Button/Button';
import ClusterIdContext from '../ClusterIdContext/ClusterIdContext';

export default function SpaceCreateButton() {
	const spaceNameRef = createRef<HTMLInputElement>();

	const clusterId = useContext(ClusterIdContext);
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
		return <Redirect to={`/clusters/${clusterId}/spaces/${newlyCreatedSpaceId}`} />;
	}

	return (
		<div>
			{isSpaceCreating ? (
				<span>Creating space...</span>
			) : (
				<>
					<input ref={spaceNameRef} type="text"></input>
					<Button onClick={() => create()}>Add a Space</Button>
				</>
			)}
		</div>
	);
}
