export default function Flexbox({
	direction = 'row',
	children
}: {
	direction: 'row' | 'column';
	children: React.ReactNode;
}) {
	return <div style={{ display: 'flex', flexDirection: direction }}>{children}</div>;
}
