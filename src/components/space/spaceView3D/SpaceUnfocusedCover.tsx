import {useContext} from 'react';
import {createStylesheet} from '../../../styles/createStylesheet';
import SpaceManagerContext from '../SpaceManagerContext';

const styles = createStylesheet({
	cover: {
		position: 'absolute',
		inset: '0px',
		padding: '5em',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
});

export default function SpaceUnfocusedCover() {
	const {renderer} = useContext(SpaceManagerContext);
	return (
		<div className={styles('cover')}>
			<button onClick={renderer?.focus}>Enter space</button>
		</div>
	);
}
