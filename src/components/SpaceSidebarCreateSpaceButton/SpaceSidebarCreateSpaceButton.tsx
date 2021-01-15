import { createRef } from 'react';
import { createSpace } from '../../api/api';

export default function SpaceSidebarCreateSpace() {
	const spaceNameRef = createRef<HTMLInputElement>();
	const visibilityRef = createRef<HTMLSelectElement>();

	function create() {
		if (spaceNameRef.current && visibilityRef.current) {
			const spaceName = spaceNameRef.current.value;
			const visibility = visibilityRef.current.value;

			if (visibility !== 'public' && visibility !== 'unlisted') {
				alert('Please choose a different visibility option');
			} else {
				createSpace(spaceName, visibility);
			}
		}
	}

	return (
		<div>
			<input ref={spaceNameRef} type="text"></input>
			<select ref={visibilityRef}>
				<option value="public">Public</option>
				<option value="unlisted">Unlisted</option>
			</select>
			<button onClick={() => create()}>Create A Space</button>
		</div>
	);
}
