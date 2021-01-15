export default function Message({ senderName, content }: { senderName: string; content: string }) {
	return (
		<p>
			{senderName}: {content}
		</p>
	);
}
