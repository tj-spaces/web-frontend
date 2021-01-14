import 'NavbarStyles.sass';

interface NavbarProps {
	isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
	<ul className="navbar">
		<li>
			<a href="/">Home</a>
		</li>
		{isLoggedIn && (
			<li>
				<a href="/profile">Profile</a>
			</li>
		)}
	</ul>;
}
