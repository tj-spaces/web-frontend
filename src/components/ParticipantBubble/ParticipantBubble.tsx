export default function ParticipantBubble({
	offsetX,
	offsetY,
	photoUrl,
	name
}: {
	offsetX: string;
	offsetY: string;
	photoUrl?: string;
	name: string;
}) {
	const initials = name
		.split(' ')
		.filter(Boolean)
		.map((word) => word.slice(0, 1).toUpperCase());

	return (
		<div className="participant-bubble" style={{ left: offsetX, top: offsetY }}>
			{photoUrl ? <img src={photoUrl} alt={name} /> : <h1>{initials}</h1>}
		</div>
	);
}
