import {Map, Record} from 'immutable';
import {Position, SpaceParticipant} from '../../typings/Space';

export function spaceParticipantToRecord(participant: SpaceParticipant) {
	return new SpaceParticipantRecord(participant);
}

export function spaceParticipantMapToImmutableMapOfRecords(participantMap: {
	[participantId: string]: SpaceParticipant;
}) {
	const convertedRecords: {
		[participantId: string]: SpaceParticipantRecord;
	} = {};
	for (let [id, object] of Object.entries(participantMap)) {
		convertedRecords[id] = spaceParticipantToRecord(object);
	}
	return Map(convertedRecords);
}

export default class SpaceParticipantRecord extends Record<SpaceParticipant>({
	id: '0',
	display_color: 'red',
	display_name: '',
	display_status: 'none',
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
