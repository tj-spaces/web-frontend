/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {borderRadiusStyles} from '../../styles/borderRadius';
import {backgroundColors} from '../../styles/colors';
import {
	stylex,
	createStylesheet,
	ClassProvider,
} from '../../styles/createStylesheet';

const styles = createStylesheet({
	base: {
		padding: '2em',
		display: 'flex',
		flexDirection: 'column',
	},
});

export default function BaseCard({
	backgroundColor,
	xstyle,
	children,
}: {
	backgroundColor: keyof typeof backgroundColors;
	xstyle?: ClassProvider;
	children: React.ReactNode;
}) {
	return (
		<div
			className={stylex(
				styles.base,
				borderRadiusStyles[2],
				backgroundColors[backgroundColor],
				xstyle
			)}
		>
			{children}
		</div>
	);
}
