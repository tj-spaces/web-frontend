import { useState } from 'react';
import BaseModal from '../Base/BaseModal';
import ClusterCreateModalChooseNameAndVisibilityScreen from '../Cluster/ClusterCreateModalChooseNameAndVisibilityScreen';
import CreateModalChooseCreationTypeScreen from './CreateModalChooseCreationTypeScreen';

export default function CreateModal({ onClose }: { onClose: () => void }) {
	const [creationType, setCreationType] = useState<'space' | 'cluster' | null>(null);

	return (
		<BaseModal onClickOutside={onClose}>
			{creationType == null ? (
				<CreateModalChooseCreationTypeScreen onNext={(type) => setCreationType(type)} />
			) : (
				<ClusterCreateModalChooseNameAndVisibilityScreen onBack={() => setCreationType(null)} />
			)}
		</BaseModal>
	);
}
