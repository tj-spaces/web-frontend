import {useContext} from 'react';
import {createStylesheet} from '../../../styles/createStylesheet';
import ViewerContext, {Position2D} from './ViewerContext';
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
	me = false,
}: {
	position: Position2D;
	me?: boolean;
}) {
	const {lastDirection} = useContext(ViewerContext);
	return (
		<ViewportComponent position={position}>
			<img
				src="/amongus.png"
				alt="Me"
				className={styles('me')}
				style={
					me && lastDirection === 'left' ? {transform: 'scaleX(-1)'} : undefined
				}
			/>
		</ViewportComponent>
	);
}
