import './Fullscreen.sass';
import classnames from 'classnames';

export default function Fullscreen({
	children,
	centerVertical = true,
	centerHorizontal = true
}: {
	children: React.ReactNode;
	centerVertical?: boolean;
	centerHorizontal?: boolean;
}) {
	return (
		<div
			className={classnames('fullscreen', {
				'fs-center-vertical': centerVertical,
				'fs-center-horizontal': centerHorizontal
			})}
		>
			{children}
		</div>
	);
}
