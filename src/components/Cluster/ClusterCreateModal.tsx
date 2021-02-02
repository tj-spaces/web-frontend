import { createRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createCluster } from '../../api/api';
import colors from '../../styles/colors';
import { classes, createStylesheet } from '../../styles/createStylesheet';
import rectangleInput from '../../styles/rectangleInput';
import BaseButton from '../Base/BaseButton';
import BaseModal from '../Base/BaseModal';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';

const visibilityOptionStyles = createStylesheet({
	base: {
		flex: 1,
		backgroundColor: '#404040',
		padding: '1rem',
		textAlign: 'center',
		cursor: 'pointer',
		subSelectors: {
			':first-child': {
				borderTopLeftRadius: '0.5em',
				borderBottomLeftRadius: '0.5em'
			},
			':last-child': {
				borderTopRightRadius: '0.5em',
				borderBottomRightRadius: '0.5em'
			}
		}
	},
	selected: {
		backgroundColor: colors.red
	}
});

export default function ClusterCreateModal({ onClose }: { onClose: () => void }) {
	const clusterNameRef = createRef<HTMLInputElement>();
	const visibilityRef = createRef<HTMLSelectElement>();

	const [isClusterCreating, setIsClusterCreating] = useState<boolean>(false);
	const [isClusterCreated, setIsClusterCreated] = useState<boolean>(false);
	const [newlyCreatedClusterId, setNewlyCreatedClusterId] = useState<string | null>(null);
	const [visibility, setVisibility] = useState<'public' | 'unlisted'>('public');

	function create() {
		if (clusterNameRef.current && visibilityRef.current) {
			const spaceName = clusterNameRef.current.value;
			const visibility = visibilityRef.current.value;
			if (!spaceName) {
				return;
			} else if (visibility !== 'public' && visibility !== 'unlisted') {
				return;
			} else {
				setIsClusterCreating(true);
				createCluster(spaceName, visibility).then((newClusterId) => {
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
		<BaseModal onClickOutside={onClose}>
			<BaseRow direction="column" spacing={1}>
				<h1>Create Cluster</h1>
				<BaseRow direction="column" alignment="start">
					<BaseText variant="caption">Name</BaseText>
					<input
						className={rectangleInput.rectangleInput}
						style={{ fontSize: '2rem', width: '100%' }}
						type="text"
						ref={clusterNameRef}
					/>
				</BaseRow>
				<BaseRow direction="column" alignment="start" width="100%">
					<BaseText variant="caption">Visibility</BaseText>
					<BaseRow direction="row" width="100%">
						<div
							className={classes(
								visibilityOptionStyles.base,
								visibility === 'public' && visibilityOptionStyles.selected
							)}
							onClick={() => setVisibility('public')}
						>
							Public
						</div>
						<div
							className={classes(
								visibilityOptionStyles.base,
								visibility === 'unlisted' && visibilityOptionStyles.selected
							)}
							onClick={() => setVisibility('unlisted')}
						>
							Unlisted
						</div>
					</BaseRow>
				</BaseRow>
				<BaseRow direction="row" spacing={1} rails={1} alignment="center">
					{!isClusterCreating ? (
						<>
							<BaseButton onClick={() => create()} size="small" style={{ flex: 1 }}>
								Create
							</BaseButton>
							<BaseButton onClick={onClose} size="small" style={{ flex: 1 }}>
								Cancel
							</BaseButton>
						</>
					) : (
						'Creating...'
					)}
				</BaseRow>
			</BaseRow>
		</BaseModal>
	);
}
