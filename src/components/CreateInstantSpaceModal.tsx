import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {createSpaceSession, createSpaceSessionInCluster} from '../api/api';
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

export default function CreateInstantSpaceModal({
	onClose,
	cluster,
}: {
	onClose: () => void;
	cluster?: Cluster;
}) {
	let [visibility, setVisibility] = useState<SpaceVisibility>('discoverable');
	let [name, setTopic] = useState<string>('');
	let [description, setDescription] = useState<string>('');
	let [creationStatus, setCreationStatus] = useState<FetchStatus>(null);
	let [newlyCreatedSpaceID, setNewlyCreatedSpaceID] = useState<string>();

	return (
		<BaseModal onClickOutside={onClose}>
			<BaseRow direction="column" spacing={1}>
				<BaseText variant="secondary-title">Start a conversation</BaseText>
				{cluster && <BaseText>Creating in cluster {cluster.name}</BaseText>}
				Topic
				<input
					className={InputStyles('rectangleInput')}
					style={{fontSize: '2rem', width: '100%'}}
					onChange={(ev) => setTopic(ev.target.value)}
					value={name}
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
				{creationStatus == null ? (
					<BaseButton
						variant="theme"
						size="small"
						onClick={() => {
							setCreationStatus('loading');
							if (cluster) {
								createSpaceSessionInCluster(
									name,
									description,
									visibility,
									false,
									cluster.id
								)
									.then((id) => {
										setCreationStatus('loaded');
										setNewlyCreatedSpaceID(id);
									})
									.catch((err) => setCreationStatus('errored'));
							} else {
								createSpaceSession(name, description, visibility, false)
									.then((id) => {
										setCreationStatus('loaded');
										setNewlyCreatedSpaceID(id);
									})
									.catch((err) => setCreationStatus('errored'));
							}
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
