import { ISpaceParticipant } from '../../typings/SpaceParticipant';

export default function SpaceParticipantListing({ participant }: { participant: ISpaceParticipant }) {
	return <span key={participant.accountId}>{participant.displayName}</span>;
}
