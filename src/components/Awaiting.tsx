import {FetchStatus} from '../api/FetchStatus';

/**
 * Utility component for rendering content that still needs to be loaded.
 */
export default function Awaiting({
	fetchStatus,
	children,
	loading = <>Loading...</>,
	errored = <>There was an error!</>,
}: {
	fetchStatus: FetchStatus;
	children: React.ReactNode;
	loading?: React.ReactNode;
	errored?: React.ReactNode;
}) {
	switch (fetchStatus) {
		// A fetchStatus of null indicates that nothing is loading
		case null:
			return null;
		case 'loaded':
			return <>{children}</>;
		case 'loading':
			return loading;
		case 'errored':
			return errored;
	}
}
