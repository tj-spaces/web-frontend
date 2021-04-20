import {createStylesheet} from '../../styles/createStylesheet';
import BaseText from '../base/BaseText';

const styles = createStylesheet({
	message: {
		position: 'absolute',
		top: '50%',
		width: '100%',
		textAlign: 'center',
		zIndex: 1,
	},
});

export default function SpaceInfoMessage({message}: {message: string}) {
	return (
		<BaseText variant="secondary-title" xstyle={styles.message}>
			{message}
		</BaseText>
	);
}
