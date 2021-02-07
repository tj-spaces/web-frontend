import { Link } from 'react-router-dom';
import { createStylesheet } from '../../styles/createStylesheet';

export const styles = createStylesheet({
	termsPage: {
		maxWidth: '1000px',
		margin: '0px auto',
		padding: '1rem 0rem'
	}
});

const TermsPage = () => (
	<div className={styles('termsPage')}>
		<Link to="/" className="underline">
			Home
		</Link>

		<h1>Terms of Service</h1>

		<h3>TLDR</h3>
		<ul>
			<li>Be at least 13 years old</li>
			<li>Don't do anything illegal</li>
			<li>Don't pretend to be someone else</li>
			<li>Don't collect data about other people</li>
			<li>Don't copy our code</li>
		</ul>

		<hr />

		<p>Welcome to Spaces!</p>
		<p>
			These Terms of Use (or "Terms") govern your use of Spaces, except where we expressly state that separate
			terms (and not these) apply, and provide information about the Spaces Service (the "Service"), outlined
			below. When you create a Spaces account or use Spaces, you agree to these terms.
		</p>
		<h2>The Spaces Service</h2>
		<p>
			We agree to provide you with the Spaces Service. The Service includes all of the Spaces products, features,
			applications, services, technologies, and software that we provide to advance Spaces's mission: To bring you
			closer to the people you love. The Service is made up of the following aspects:
		</p>
		<ul>
			<li>
				Offering opportunities to connect with people, build communities, and create, explore, and enjoy virtual
				worlds on the Spaces cloud.
			</li>
			<li>Fostering a positive, inclusive, and safe environment.</li>
		</ul>
		<h2>Your Commitments</h2>
		<p>
			<b>Who Can Use Spaces.</b> We want our Service to be as open and inclusive as possible, but we also want it
			to be safe, secure, and in accordance with the law. So, we need you to commit to a few restrictions in order
			to be part of the Spaces community.
		</p>
		<ul>
			<li>You must be at least 13 years old.</li>
			<li>
				You must not be prohibited from receiving any aspect of our Service under applicable laws or engaging in
				payments related Services if you are on an applicable denied party listing.
			</li>
			<li>We must not have previously disabled your account for violation of law or any of our policies.</li>
		</ul>

		<p>
			<b>How you can't use Spaces.</b> Providing a safe and open Service for a broad community requires that we
			all do our part.
		</p>
		<ul>
			<li>You can't impersonate others.</li>
			<li>
				You can't do anything unlawful, misleading, or fraudulent or for an illegal or unauthorized purpose.
			</li>
			<li>You can't do anything to interfere with or impair the intended operation of the Service.</li>
			<li>You can't attempt to create accounts or access or collect information in unauthorized ways.</li>
			<li>
				You can't post someone else’s private or confidential information without permission or do anything that
				violates someone else's rights, including intellectual property rights (e.g., copyright infringement,
				trademark infringement, counterfeit, or pirated goods).
			</li>
			<li>
				You can't modify, translate, create derivative works of, or reverse engineer our products or their
				components.
			</li>
		</ul>

		<Link to="/" className="underline">
			Home
		</Link>
	</div>
);

export default TermsPage;
