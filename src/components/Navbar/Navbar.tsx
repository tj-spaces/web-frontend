import React from 'react';
import { Link } from 'react-router-dom';
import boxShadow from '../../styles/boxShadow';
import { createStylesheet } from '../../styles/createStylesheet';
import { rowSpacings } from '../Base/BaseRow';
import ClusterCreateButton from '../Cluster/ClusterCreateButton';
import NavbarCreateButton from './NavbarCreateButton';
import NavbarIcon from './NavbarIcon';

export const styles = createStylesheet({
	navbar: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: '0.5rem',
		paddingBottom: '1rem',

		zIndex: 1,
		backgroundColor: '#404040',

		extends: [rowSpacings[1], boxShadow.boxShadow]
	}
});

export default function Navbar() {
	return (
		<div className={styles('navbar')}>
			<NavbarIcon>
				<ClusterCreateButton />
			</NavbarIcon>

			<NavbarIcon>
				<Link to="/logout">
					<i className="fas fa-sign-out-alt"></i>
				</Link>
			</NavbarIcon>

			<NavbarIcon>
				<Link to="/explore">
					<i className="fas fa-compass"></i>
				</Link>
			</NavbarIcon>

			<NavbarCreateButton />
		</div>
	);
}
