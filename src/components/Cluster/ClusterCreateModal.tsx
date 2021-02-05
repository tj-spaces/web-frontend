import BaseModal from '../Base/BaseModal';
import ClusterCreateModalChooseNameAndVisibilityScreen from './ClusterCreateModalChooseNameAndVisibilityScreen';

export default function ClusterCreateModal({ onClose }: { onClose: () => void }) {
	return (
		<BaseModal onClickOutside={onClose}>
			<ClusterCreateModalChooseNameAndVisibilityScreen onBack={onClose} />
		</BaseModal>
	);
}
