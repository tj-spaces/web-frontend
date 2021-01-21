import './Modal.sass';

export default function Modal({ children }: { children: React.ReactNode }) {
	return (
		<div className="modal-background">
			<div className="modal-foreground">{children}</div>
		</div>
	);
}
