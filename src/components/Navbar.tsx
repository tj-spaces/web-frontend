import React from 'react';
import {Link} from 'react-router-dom';
import boxShadow from '../styles/boxShadow';
import {createStylesheet} from '../styles/createStylesheet';
import BaseRow from './Base/BaseRow';
import CreateInstanceSpaceButton from './CreateInstantSpaceButton';

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
			backgroundColor="dark2"
			xstyle={styles.navbar}
		>
			<Link to="/logout">Log out</Link>

			{/* <Link to="/explore">Explore</Link> */}

			<CreateInstanceSpaceButton />
		</BaseRow>
	);
}
