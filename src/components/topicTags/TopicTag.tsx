/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import colors from '../../styles/colors';
import {createStylesheet} from '../../styles/createStylesheet';

const styles = createStylesheet({
	topicTag: {
		display: 'block',
		padding: '0.5em',
		border: '1px solid ' + colors.bgSecondary,
		borderRadius: '2em',
		cursor: 'pointer',
		backgroundColor: colors.bgElevated,
	},
});

export default function TopicTag({
	children,
	onClick,
}: {
	children: string;
	onClick: () => void;
}) {
	return (
		<span className={styles('topicTag')} onClick={onClick}>
			{children}
		</span>
	);
}
