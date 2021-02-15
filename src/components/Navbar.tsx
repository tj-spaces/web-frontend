import React from 'react';
import {Link} from 'react-router-dom';
import boxShadow from '../styles/boxShadow';
import {createStylesheet} from '../styles/createStylesheet';
import BaseRow from './base/BaseRow';
import CreateInstantSpaceButton from './CreateInstantSpaceButton';

export const styles = createStylesheet({
	navbar: {
		zIndex: 1,
		extends: [boxShadow.boxShadow],
	},
});

/**
 * Renders a bar along the top of the screen with helpful links. These links
 * include a button to create an instant space, and a button to log out.
 */
export default function Navbar() {
	return (
		<BaseRow
			direction="row"
			alignment="center"
			justifyContent="center"
			rails={1}
			spacing={1}
			backgroundColor="bgElevated"
			xstyle={styles.navbar}
		>
			<Link to="/logout">Log out</Link>
			<Link to="/account">My Account</Link>
			<Link to="/">Home</Link>

			<CreateInstantSpaceButton />
		</BaseRow>
	);
}
