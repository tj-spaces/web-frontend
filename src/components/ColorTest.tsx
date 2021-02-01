import colors from '../styles/colors';

export default function ColorTest() {
	return (
		<div>
			{Object.entries(colors).map(([name, value]) => {
				return <div style={{ width: '10em', height: '10em', backgroundColor: value }}>{name}</div>;
			})}
		</div>
	);
}
