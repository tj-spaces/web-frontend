import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {createSpace} from '../api/spaces';
import {FetchStatus} from '../api/FetchStatus';
import {backgroundColors} from '../styles/colors';
import InputStyles from '../styles/InputStyles';
import {Cluster} from '../typings/Cluster';
import {SpaceVisibility} from '../typings/Space';
import BaseButton from './base/BaseButton';
import BaseButtonGroupItem from './base/BaseButtonGroupItem';
import BaseModal from './base/BaseModal';
import BaseRow from './base/BaseRow';
import BaseText from './base/BaseText';
import {WorldType} from '../typings/Types';

export default function CreateInstantSpaceModal({
	onClose,
	cluster,
}: {
	onClose: () => void;
	cluster?: Cluster;
}) {
	let [visibility, setVisibility] = useState<SpaceVisibility>('discoverable');
	let [worldType, setWorldType] = useState<WorldType>('2d-pixel');
	let [name, setName] = useState<string>('');
	let [description, setDescription] = useState<string>('');
	let [creationStatus, setCreationStatus] = useState<FetchStatus>(null);
	let [newlyCreatedSpaceID, setNewlyCreatedSpaceID] = useState<string>();

	return (
		<BaseModal onClose={onClose}>
			<BaseRow direction="column" spacing={1}>
				<BaseText variant="secondary-title">Start a conversation</BaseText>
				{cluster && <BaseText>Creating in cluster {cluster.name}</BaseText>}
				Name
				<input
					className={InputStyles('rectangleInput')}
					style={{fontSize: '2rem', width: '100%'}}
					onChange={(ev) => setName(ev.target.value)}
					value={name}
				/>
				Description
				<input
					className={InputStyles('rectangleInput')}
					style={{fontSize: '2rem', width: '100%'}}
					onChange={(ev) => setDescription(ev.target.value)}
					value={description}
				/>
				Visibility
				<BaseRow direction="row">
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
				</BaseRow>
				Type
				<BaseRow direction="row">
					<BaseButtonGroupItem
						classes={worldType === '3d-voxel' && backgroundColors.red}
						onClick={() => setWorldType('3d-voxel')}
					>
						3D
					</BaseButtonGroupItem>
					<BaseButtonGroupItem
						classes={worldType === '2d-pixel' && backgroundColors.red}
						onClick={() => setWorldType('2d-pixel')}
					>
						2D
					</BaseButtonGroupItem>
				</BaseRow>
				{creationStatus == null ? (
					<BaseButton
						variant="theme"
						size="small"
						onClick={() => {
							setCreationStatus('loading');
							createSpace(
								name,
								description,
								visibility,
								false,
								worldType,
								cluster?.id
							)
								.then((id) => {
									setCreationStatus('loaded');
									setNewlyCreatedSpaceID(id);
								})
								.catch((err) => setCreationStatus('errored'));
						}}
					>
						Start
					</BaseButton>
				) : creationStatus === 'loading' ? (
					<BaseText>Creating</BaseText>
				) : creationStatus === 'loaded' ? (
					<BaseText>
						Space is made.{' '}
						<Link to={'/spaces/' + newlyCreatedSpaceID}>
							Click here to join!
						</Link>
					</BaseText>
				) : (
					<BaseText>Error</BaseText>
				)}
			</BaseRow>
		</BaseModal>
	);
}
