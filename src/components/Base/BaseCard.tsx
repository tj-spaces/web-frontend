import { CSSProperties } from 'react';
import { BorderRadiusBubble } from '../../styles/borderRadius';
import { stylex, createStylesheet } from '../../styles/createStylesheet';
import BackgroundColorContext from '../BackgroundColorContext';

const styles = createStylesheet({
	base: {
		borderRadius: BorderRadiusBubble,
		padding: '2em',
		display: 'flex',
		flexDirection: 'column'
	}
});

const backgroundColorStyles = createStylesheet({
	dark: {
		backgroundColor: 'var(--spaces-color-dark-2)'
	},
	light: {
		backgroundColor: 'var(--spaces-color-light-1)'
	}
});

export default function BaseCard({
	backgroundColor,
	style,
	children
}: {
	backgroundColor: 'light' | 'dark';
	style?: CSSProperties;
	children: React.ReactNode;
}) {
	return (
		<div className={stylex(styles.base, backgroundColorStyles[backgroundColor])} style={style}>
			<BackgroundColorContext.Provider value={backgroundColor}>{children}</BackgroundColorContext.Provider>
		</div>
	);
}
