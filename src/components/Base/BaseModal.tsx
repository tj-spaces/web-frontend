import { useEffect, useRef } from 'react';
import boxShadow from '../../styles/boxShadow';
import { stylex, createStylesheet } from '../../styles/createStylesheet';
import BackgroundColorContext from '../BackgroundColorContext';

export const styles = createStylesheet({
	modalBackground: {
		zIndex: 2,
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
		transition: 'all 800ms ease',
		padding: '1em',
		textTransform: 'none',
		extends: [boxShadow.boxShadow]
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
			let target = ev.target as HTMLDivElement;
			if (!fgRef.current?.contains(target)) {
				onClickOutside();
			}
		};
		document.addEventListener('click', checkForOutsideClick);
		return () => {
			document.removeEventListener('click', checkForOutsideClick);
		};
	}, [onClickOutside]);
	return (
		<div className={styles('modalBackground')}>
			<BackgroundColorContext.Provider value="dark">
				<div ref={fgRef} className={stylex(styles.modalForeground, variantStyles[variant])}>
					{children}
				</div>
			</BackgroundColorContext.Provider>
		</div>
	);
}
