import {useCallback, useRef} from 'react';
import {Cluster} from '../../typings/Cluster';
import BaseButton from '../base/BaseButton';
import BaseRow from '../base/BaseRow';

/**
 * Contains a simple textbox that allows people to make a post.
 * The optional `clusterID` prop allows you to post to a specific cluster.
 */
export default function PostCreator({cluster}: {cluster?: Cluster}) {
	const contentRef = useRef<HTMLTextAreaElement>(null);
	const submit = useCallback(() => {
		let content = contentRef.current?.value;
		if (content) {
			// `content` is not undefined, and has some value
		}
	}, []);

	return (
		<BaseRow direction="column">
			<textarea ref={contentRef} />
			<BaseButton onClick={() => submit()} variant="theme">
				Post
			</BaseButton>
		</BaseRow>
	);
}
