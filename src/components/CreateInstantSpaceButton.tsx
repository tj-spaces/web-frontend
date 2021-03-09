/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useState} from 'react';
import {Cluster} from '../typings/Cluster';
import BaseButton from './base/BaseButton';
import CreateInstantSpaceModal from './CreateInstantSpaceModal';

/**
 * A button that when clicked, opens a prompt for creating a space.
 * You can optionally specify a `cluster` to create the space in.
 */
export default function CreateInstantSpaceButton({
	cluster,
}: {
	cluster?: Cluster;
}) {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			{modalOpen && (
				<CreateInstantSpaceModal
					onClose={() => setModalOpen(false)}
					cluster={cluster}
				/>
			)}
			<BaseButton
				variant="theme"
				size="small"
				onClick={() => setModalOpen(true)}
			>
				Start A Space
			</BaseButton>
		</>
	);
}
