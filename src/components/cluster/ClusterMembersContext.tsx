import {createContext} from 'react';
import {PromiseStatus} from '../../hooks/usePromiseStatus';
import {PublicUserInfo} from '../../typings/PublicUserInfo';

export type ClusterMembersData = {
	members: PublicUserInfo[];
	membersFs: PromiseStatus<PublicUserInfo[]>['status'];
};

const ClusterMembersContext = createContext<ClusterMembersData>({
	members: [],
	membersFs: null,
});

export default ClusterMembersContext;
