import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {createSpaceSession, createSpaceSessionInCluster} from '../api/api';
import {backgroundColors} from '../styles/colors';
import InputStyles from '../styles/InputStyles';
import {Cluster} from '../typings/Cluster';
import {SpaceVisibility} from '../typings/Space';
import BaseButton from './base/BaseButton';
import BaseButtonGroupItem from './base/BaseButtonGroupItem';
import BaseModal from './base/BaseModal';
import BaseRow from './base/BaseRow';
import BaseText from './base/BaseText';

export type CreationStatus = 'none' | 'pending' | 'done' | 'error';

export default function CreateInstantSpaceModal({
	onClose,
	cluster,
}: {
	onClose: () => void;
	cluster?: Cluster;
}) {
	let [visibility, setVisibility] = useState<SpaceVisibility>('discoverable');
	let [topic, setTopic] = useState<string>('');
	let [creationStatus, setCreationStatus] = useState<CreationStatus>('none');
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
					value={topic}
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
				{creationStatus === 'none' ? (
					<BaseButton
						variant="theme"
						size="small"
						onClick={() => {
							setCreationStatus('pending');
							if (cluster) {
								createSpaceSessionInCluster(cluster.id, topic, visibility)
									.then((id) => {
										setCreationStatus('done');
										setNewlyCreatedSpaceID(id);
									})
									.catch((err) => setCreationStatus('error'));
							} else {
								createSpaceSession(topic, visibility)
									.then((id) => {
										setCreationStatus('done');
										setNewlyCreatedSpaceID(id);
									})
									.catch((err) => setCreationStatus('error'));
							}
						}}
					>
						Start
					</BaseButton>
				) : creationStatus === 'pending' ? (
					<BaseText>Creating Space</BaseText>
				) : creationStatus === 'done' ? (
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
