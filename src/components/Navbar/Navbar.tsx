import React from 'react';
import { Link } from 'react-router-dom';
import boxShadow from '../../styles/boxShadow';
import { createStylesheet } from '../../styles/createStylesheet';
import { rowSpacings } from '../Base/BaseRow';
import NavbarCreateButton from './NavbarCreateButton';

export const styles = createStylesheet({
	navbar: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: '1rem',
		paddingBottom: '1rem',

		zIndex: 1,
		backgroundColor: '#404040',

		extends: [rowSpacings[1], boxShadow.boxShadow]
	}
});

export default function Navbar() {
	return (
		<div className={styles('navbar')}>
			<Link to="/logout">Log out</Link>

			<Link to="/explore">Explore</Link>

			<NavbarCreateButton />
		</div>
	);
}
