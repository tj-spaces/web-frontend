import BaseButton from '../Base/BaseButton';
import BaseModal from '../Base/BaseModal';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';

export default function NavbarCreateModal({ close }: { close: () => void }) {
	return (
		<BaseModal onClickOutside={() => close()}>
			<BaseRow direction="column" spacing={1}>
				<BaseText fontWeight="bold" fontSize="large" variant="heading" alignment="center">
					Create
				</BaseText>
				<BaseRow direction="row" spacing={1}>
					<BaseButton size="small" variant="theme">
						Instant Space
					</BaseButton>
					<BaseButton size="small" variant="theme">
						Cluster
					</BaseButton>
				</BaseRow>
			</BaseRow>
		</BaseModal>
	);
}
