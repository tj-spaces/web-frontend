import 'aframe';

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'a-scene': any;
			'a-box': any;
			'a-sphere': any;
			'a-cylinder': any;
			'a-plane': any;
			'a-sky': any;
			'a-camera': any;
			'a-cursor': any;
			'a-entity': any;
		}
	}
}

export default function Space_new() {
	return (
		<a-scene>
			<a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
			<a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
			<a-cylinder
				position="1 0.75 -3"
				radius="0.5"
				height="1.5"
				color="#FFC65D"
			/>
			<a-plane
				position="0 0 -4"
				rotation="-90 0 0"
				width="4"
				height="4"
				color="#7BC8A4"
			/>
			<a-sky color="#ECECEC" />
			<a-entity camera look-controls position="0 1.6 0"></a-entity>
		</a-scene>
	);
}
