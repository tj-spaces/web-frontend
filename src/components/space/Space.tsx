/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {PointerLockControls} from '@react-three/drei';
import {Suspense, useRef, useState} from 'react';
import CameraPositionUpdater from './CameraPositionUpdater';
import Floor from './Floor';
import SpaceCanvasRoot from './SpaceCanvasRoot';
import SpaceRemoteAudioRoot from './SpaceRemoteAudioRoot';
import SpaceUserRendererRoot from './SpaceUserRendererRoot';
import SushiTable from './SushiTable';
import useMoveDirectionUpdater from './useMoveDirectionUpdater';

export default function Space() {
	const rotation = useRef<number>(0);

	useMoveDirectionUpdater(rotation);

	const [canvas, setCanvas] = useState<HTMLDivElement | null>(null);

	return (
		<div style={{width: '100%', height: '100%'}} ref={setCanvas}>
			<SpaceRemoteAudioRoot />
			<SpaceCanvasRoot>
				<PointerLockControls
					onUpdate={(controls) =>
						(rotation.current = controls.getObject().rotation.z)
					}
					domElement={canvas ?? undefined}
				/>

				<CameraPositionUpdater rotation={rotation} />

				<ambientLight intensity={0.5} />

				<SpaceUserRendererRoot />

				<Suspense fallback="Loading model">
					<SushiTable />
				</Suspense>

				<Floor />
			</SpaceCanvasRoot>
		</div>
	);
}
