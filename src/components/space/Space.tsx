/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {Suspense, useRef, useState} from 'react';
import CameraPositionUpdater from './CameraPositionUpdater';
import Floor from './Floor';
import SpaceCanvasRoot from './SpaceCanvasRoot';
import RemoteAudioRenderer from './renderers/RemoteAudioRenderer';
import UsersRenderer from './renderers/UsersRenderer';
import SushiTable from './SushiTable';
import useMoveDirectionUpdater from './useMoveDirectionUpdater';
import PointerLockControls from '../PointerLockControls';

export default function Space() {
	const rotation = useRef<number>(0);
	const [canvasElement, setCanvasElement] = useState<HTMLDivElement | null>(
		null
	);

	useMoveDirectionUpdater(rotation, canvasElement);

	return (
		<div style={{width: '100%', height: '100%'}} ref={setCanvasElement}>
			<RemoteAudioRenderer />
			<SpaceCanvasRoot>
				{canvasElement && (
					<PointerLockControls
						onUpdate={(camera) => (rotation.current = camera.rotation.z)}
						element={canvasElement}
					/>
				)}

				<CameraPositionUpdater rotation={rotation} />

				<ambientLight intensity={0.5} />

				<UsersRenderer />

				<Suspense fallback="Loading model">
					<SushiTable />
				</Suspense>

				<Floor />
			</SpaceCanvasRoot>
		</div>
	);
}
