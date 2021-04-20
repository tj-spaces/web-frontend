/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useEffect, useRef} from 'react';
import boxShadow from '../../styles/boxShadow';
import {stylex, createStylesheet} from '../../styles/createStylesheet';
import BaseText from './BaseText';

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
		cursor: 'auto',
	},
	modalForeground: {
		backgroundColor: '#303030',
		borderRadius: '0.5em',
		transition: 'all 800ms ease',
		padding: '1em',
		textTransform: 'none',
		position: 'relative',
		extends: [boxShadow.boxShadow],
	},
	modalCloseButton: {
		position: 'absolute',
		right: '0.5rem',
		top: '0.5rem',
	},
});

export const variantStyles = createStylesheet({
	wide: {
		minWidth: '100ch',
	},
	fitContent: {},
});

export default function BaseModal({
	children,
	variant = 'wide',
	onClose,
	closable = true,
}: {
	children: React.ReactNode;
	variant?: keyof typeof variantStyles;
	onClose: () => void;
	closable?: boolean;
}) {
	const fgRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const checkForOutsideClick = (ev: MouseEvent) => {
			let target = ev.target as HTMLDivElement;
			if (!fgRef.current?.contains(target)) {
				onClose();
			}
		};
		document.addEventListener('click', checkForOutsideClick);
		return () => {
			document.removeEventListener('click', checkForOutsideClick);
		};
	}, [onClose]);
	return (
		<div className={styles('modalBackground')}>
			<div
				ref={fgRef}
				className={stylex(styles.modalForeground, variantStyles[variant])}
			>
				{closable && (
					<BaseText
						variant="body"
						xstyle={styles.modalCloseButton}
						onClick={() => onClose()}
					>
						Close
					</BaseText>
				)}
				{children}
			</div>
		</div>
	);
}
