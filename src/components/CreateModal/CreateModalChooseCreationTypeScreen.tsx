import BaseButton from '../Base/BaseButton';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';

export default function CreateModalChooseCreationTypeScreen({
	onNext
}: {
	onNext: (type: 'space' | 'cluster') => void;
}) {
	return (
		<BaseRow direction="column" spacing={1}>
			<BaseText fontWeight="bold" fontSize="large" variant="heading" alignment="center">
				Create
			</BaseText>
			<BaseRow direction="row" spacing={1}>
				<BaseButton size="small" variant="theme" onClick={() => onNext('space')}>
					Instant Space
				</BaseButton>
				<BaseButton size="small" variant="theme" onClick={() => onNext('cluster')}>
					Cluster
				</BaseButton>
			</BaseRow>
		</BaseRow>
	);
}
