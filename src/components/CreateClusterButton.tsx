/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useState} from 'react';
import BaseButton from './base/BaseButton';
import CreateClusterModal from './CreateClusterModal';

/**
 * A button that when clicked, opens a prompt for creating a space.
 * You can optionally specify a `cluster` to create the space in.
 */
export default function CreateClusterButton() {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			{modalOpen && <CreateClusterModal onClose={() => setModalOpen(false)} />}
			<BaseButton
				variant="theme"
				size="small"
				onClick={() => setModalOpen(true)}
			>
				Create a Cluster
			</BaseButton>
		</>
	);
}
