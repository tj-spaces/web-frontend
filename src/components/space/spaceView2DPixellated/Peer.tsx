import {createStylesheet} from '../../../styles/createStylesheet';
import {Position2D} from './ViewerContext';
import ViewportComponent from './ViewportComponent';

const styles = createStylesheet({
	me: {
		position: 'absolute',
		maxHeight: '5rem',
		left: '50%',
		top: '50%',
	},
});

export default function Peer({
	position,
	direction,
	me = false,
}: {
	position: Position2D;
	direction: 'left' | 'right';
	me?: boolean;
}) {
	return (
		<ViewportComponent position={position}>
			<img
				src="/amongus.png"
				alt="Me"
				className={styles('me')}
				style={direction === 'left' ? {transform: 'scaleX(-1)'} : undefined}
			/>
		</ViewportComponent>
	);
}
