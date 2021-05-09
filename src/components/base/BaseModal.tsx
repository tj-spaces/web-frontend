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

export const backgroundColorStyles = createStylesheet({
	none: {},
	dark: {
		backgroundColor: '#303030',
	},
});

export default function BaseModal({
	children,
	size = 'wide',
	onClose,
	closable = true,
	backgroundColor = 'dark',
}: {
	children: React.ReactNode;
	onClose: () => void;
	closable?: boolean;
	size?: keyof typeof variantStyles;
	backgroundColor?: keyof typeof backgroundColorStyles;
}) {
	const foreground = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const checkForOutsideClick = (ev: MouseEvent) => {
			let target = ev.target as HTMLDivElement;
			if (!foreground.current?.contains(target)) {
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
				ref={foreground}
				className={stylex(
					styles.modalForeground,
					variantStyles[size],
					backgroundColorStyles[backgroundColor]
				)}
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
