import { createRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createCluster } from '../../api/api';
import { backgroundColors } from '../../styles/colors';
import InputStyles from '../../styles/InputStyles';
import { ClusterVisibility } from '../../typings/Cluster';
import BaseButton from '../Base/BaseButton';
import BaseButtonGroupItem from '../Base/BaseButtonGroupItem';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';

export default function ClusterCreateModalChooseNameAndVisibilityScreen({ onBack }: { onBack: () => void }) {
	const nameRef = createRef<HTMLInputElement>();

	const [isClusterCreating, setIsClusterCreating] = useState<boolean>(false);
	const [isClusterCreated, setIsClusterCreated] = useState<boolean>(false);
	const [newlyCreatedClusterId, setNewlyCreatedClusterId] = useState<string | null>(null);
	const [visibility, setVisibility] = useState<ClusterVisibility>('discoverable');

	function create() {
		if (nameRef.current) {
			const name = nameRef.current.value;
			if (!name) {
				alert('No space name');
				return;
			} else if (visibility !== 'discoverable' && visibility !== 'unlisted' && visibility !== 'secret') {
				alert('No visibility');
				return;
			} else {
				setIsClusterCreating(true);
				createCluster(name, visibility).then((newClusterId) => {
					setNewlyCreatedClusterId(newClusterId);
					setIsClusterCreated(true);
				});
			}
		}
	}

	if (isClusterCreated && newlyCreatedClusterId) {
		return <Redirect to={`/clusters/${newlyCreatedClusterId}`} />;
	}

	return (
		<BaseRow direction="column" spacing={1}>
			<BaseText variant="heading">Create Cluster</BaseText>
			<BaseRow direction="column" alignment="start">
				<BaseText variant="caption">Name</BaseText>
				<input
					className={InputStyles('rectangleInput')}
					style={{ fontSize: '2rem', width: '100%' }}
					type="text"
					ref={nameRef}
				/>
			</BaseRow>
			<BaseRow direction="column" alignment="start" width="100%">
				<BaseText variant="caption">Visibility</BaseText>
				<BaseRow direction="row" width="100%">
					<BaseButtonGroupItem
						classes={visibility === 'discoverable' && backgroundColors.red}
						onClick={() => setVisibility('discoverable')}
					>
						Discoverable
					</BaseButtonGroupItem>
					<BaseButtonGroupItem
						classes={visibility === 'unlisted' && backgroundColors.red}
						onClick={() => setVisibility('unlisted')}
					>
						Unlisted
					</BaseButtonGroupItem>
					<BaseButtonGroupItem
						classes={visibility === 'secret' && backgroundColors.red}
						onClick={() => setVisibility('secret')}
					>
						Secret
					</BaseButtonGroupItem>
				</BaseRow>
			</BaseRow>
			<BaseRow direction="row" spacing={1} rails={1} alignment="center">
				{!isClusterCreating ? (
					<>
						<BaseButton onClick={() => onBack()} size="small" style={{ flex: 1 }}>
							Back
						</BaseButton>
						<BaseButton onClick={() => create()} size="small" style={{ flex: 1 }}>
							Create
						</BaseButton>
					</>
				) : (
					'Creating...'
				)}
			</BaseRow>
		</BaseRow>
	);
}
