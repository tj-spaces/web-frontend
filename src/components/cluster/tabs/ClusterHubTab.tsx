import {PromiseStatus} from '../../../hooks/usePromiseStatus';
import {PublicUserInfo} from '../../../typings/PublicUserInfo';
import Awaiting from '../../Awaiting';
import BaseRow from '../../base/BaseRow';
import BaseText from '../../base/BaseText';
import UserListRow from '../../UserListRow';

export default function ClusterHubTab({
	members,
	membersFs,
}: {
	members: PublicUserInfo[] | null;
	membersFs: PromiseStatus<any>['status'];
}) {
	return (
		<>
			<BaseText variant="primary-title" alignment="center">
				wave to your friends and get the party started!
			</BaseText>
			<BaseRow direction="column" alignment="center" spacing={1}>
				<BaseText variant="secondary-title">Members</BaseText>
				<Awaiting fetchStatus={membersFs}>
					{members?.map((member) => (
						<UserListRow user={member} key={member.id} />
					))}
				</Awaiting>
			</BaseRow>
		</>
	);
}
