import { useEffect, useRef } from 'react';
import boxShadow from '../../styles/boxShadow';
import { classes, createStylesheet } from '../../styles/createStylesheet';
import BackgroundColorContext from '../BackgroundColorContext/BackgroundColorContext';

export const styles = createStylesheet({
	modalBackground: {
		zIndex: 1,
		position: 'fixed',
		left: '0vw',
		top: '0vh',
		width: '100vw',
		height: '100vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'auto'
	},
	modalForeground: {
		backgroundColor: '#303030',
		borderRadius: '0.5em',
		transition: 'height 800ms ease',
		extends: [boxShadow.boxShadow]
		// padding: '2em'
	}
});

export const variantStyles = createStylesheet({
	wide: {
		minWidth: '512px'
	}
});

export default function BaseModal({
	children,
	variant = 'wide',
	onClickOutside
}: {
	children: React.ReactNode;
	variant?: 'wide';
	onClickOutside: () => void;
}) {
	const fgRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const checkForOutsideClick = (ev: MouseEvent) => {
			if (!fgRef.current?.contains(ev.target as HTMLDivElement)) {
				onClickOutside();
			}
		};
		document.addEventListener('click', checkForOutsideClick);
		return () => {
			document.removeEventListener('click', checkForOutsideClick);
		};
	}, [onClickOutside]);
	return (
		<div className={classes(styles.modalBackground)}>
			<BackgroundColorContext.Provider value="dark">
				<div ref={fgRef} className={classes(styles.modalForeground, variantStyles[variant])}>
					{children}
				</div>
			</BackgroundColorContext.Provider>
		</div>
	);
}
