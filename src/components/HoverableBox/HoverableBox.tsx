import '../../styles/box.sass';

export default function HoverableBox({ children }: { children: React.ReactNode }) {
	return <div className="hoverable-light-box">{children}</div>;
}
