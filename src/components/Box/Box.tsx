export const BORDER_RADIUS = '0.5em';

export default function Box({ children }: { children: React.ReactNode }) {
	return <div style={{ borderRadius: BORDER_RADIUS }}>{children}</div>;
}
