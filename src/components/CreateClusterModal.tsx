import {createRef, useCallback, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {createCluster} from '../api/clusters';
import {backgroundColors} from '../styles/colors';
import InputStyles from '../styles/InputStyles';
import {ClusterVisibility} from '../typings/Cluster';
import BaseButton from './base/BaseButton';
import BaseButtonGroupItem from './base/BaseButtonGroupItem';
import BaseModal from './base/BaseModal';
import BaseRow from './base/BaseRow';
import BaseText from './base/BaseText';

/**
 * Renders a modal where a user can choose the name and visibility of a cluster.
 */
export default function ClusterCreateModal({onClose}: {onClose: () => void}) {
	const nameRef = createRef<HTMLInputElement>();

	const [isClusterCreating, setIsClusterCreating] = useState<boolean>(false);
	const [isClusterCreated, setIsClusterCreated] = useState<boolean>(false);
	const [newlyCreatedClusterId, setNewlyCreatedClusterId] = useState<
		string | null
	>(null);
	const [visibility, setVisibility] = useState<ClusterVisibility>(
		'discoverable'
	);

	const create = useCallback(() => {
		if (nameRef.current) {
			const name = nameRef.current.value;
			if (!name) {
				alert('No space name');
				return;
			} else {
				setIsClusterCreating(true);
				createCluster(name, visibility).then((newClusterId) => {
					setNewlyCreatedClusterId(newClusterId);
					setIsClusterCreated(true);
				});
			}
		}
	}, [nameRef, visibility]);

	if (isClusterCreated && newlyCreatedClusterId) {
		return <Redirect to={`/clusters/${newlyCreatedClusterId}`} />;
	}

	return (
		<BaseModal onClose={onClose}>
			<BaseRow direction="column" spacing={1}>
				<BaseText variant="secondary-title">Create Cluster</BaseText>
				<BaseRow direction="column" alignment="start">
					<BaseText variant="caption">Name</BaseText>
					<input
						className={InputStyles('rectangleInput')}
						style={{fontSize: '2rem', width: '100%'}}
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
							<BaseButton
								onClick={() => onClose()}
								size="small"
								style={{flex: 1}}
							>
								Back
							</BaseButton>
							<BaseButton
								onClick={() => create()}
								size="small"
								style={{flex: 1}}
							>
								Create
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
