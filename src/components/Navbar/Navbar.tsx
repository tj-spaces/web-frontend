import React from 'react';
import { Link } from 'react-router-dom';
import boxShadow from '../../styles/boxShadow';
import { createStylesheet } from '../../styles/createStylesheet';
import BaseRow from '../Base/BaseRow';
import CreateInstanceSpaceButton from '../CreateInstantSpaceButton';

export const styles = createStylesheet({
	navbar: {
		zIndex: 1,
		extends: [boxShadow.boxShadow]
	}
});

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

			<Link to="/explore">Explore</Link>

			<CreateInstanceSpaceButton />
		</BaseRow>
	);
}
