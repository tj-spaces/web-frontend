import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';

export default function NblaIdentifierEditor({
	id,
	setID,
}: {
	id: string;
	setID: (id: string) => void;
}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="caption">Identifier</BaseText>
			<input
				type="text"
				onChange={(evt) => setID(evt.target.value)}
				value={id}
			/>
		</BaseRow>
	);
}
