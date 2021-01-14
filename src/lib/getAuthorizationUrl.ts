export function getIonAuthorizationUrl(): string {
	const url = new URL('https://ion.tjhsst.edu/oauth/authorize');

	url.searchParams.set('response_type', 'code');
	url.searchParams.set('scope', 'read');
	url.searchParams.set('client_id', 'ScL9QdZ9m3iGmHG11uznwABg4ZSkabQJan05ZYsk');
	url.searchParams.set('redirect_uri', 'http://localhost:3000/auth/ion/callback');

	return url.toString();
}

export function getGoogleAuthorizationUrl(): string {
	const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');

	url.searchParams.set('access_type', 'offline');
	url.searchParams.set('prompt', 'consent');
	url.searchParams.set(
		'scope',
		['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'].join(' ')
	);
	url.searchParams.set('response_type', 'code');
	url.searchParams.set('client_id', '368145913097-9ttib28rs8o6e9iqulr7mg2t0qvst28i.apps.googleusercontent.com');
	url.searchParams.set('redirect_uri', 'http://localhost:3000/auth/google/callback');

	return url.toString();
}
