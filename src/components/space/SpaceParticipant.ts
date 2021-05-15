import {Map, Record} from 'immutable';
import {ISpaceParticipant, Position} from '../../typings/Space';

export function spaceParticipantMapToImmutableMapOfRecords(participantMap: {
	[participantId: string]: ISpaceParticipant;
}) {
	const convertedRecords: {
		[participantId: string]: SpaceParticipant;
	} = {};
	for (let [id, object] of Object.entries(participantMap)) {
		convertedRecords[id] = new SpaceParticipant(object);
	}
	return Map(convertedRecords);
}

export default class SpaceParticipant extends Record<ISpaceParticipant>({
	id: '0',
	displayColor: 'red',
	displayName: '',
	displayStatus: 'none',
	can_present: false,
	can_activate_microphone: false,
	can_activate_camera: false,
	is_administrator: false,
	is_moderator: false,
	is_presenting: false,
	position: {x: 0, y: 0, z: 0},
	rotation: 0,
	rotating_direction: 0,
}) {
	moveTo(position: Position) {
		return this.set('position', position);
	}
	//
}
