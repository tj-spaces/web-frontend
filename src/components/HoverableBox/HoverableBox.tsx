import Box from '../Box/Box';

export default function HoverableBox({ children }: { children: React.ReactNode }) {
	return (
		<Box center borderRadiusSize="bubble" backgroundColor="#202020" padding="compact">
			{children}
		</Box>
	);
}
