/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import React from 'react';
import {reportError} from '../api/analytics';
import Fullscreen from './base/BaseFullscreen';

export default class ErrorBoundary extends React.Component {
	state:
		| {error: Error; type: 'error'}
		| {error: PromiseRejectionEvent; type: 'rejection'}
		| {error: null; type: 'none'} = {
		error: null,
		type: 'none',
	};
	static getDerivedStateFromError(error: any) {
		return {error, type: 'error'};
	}
	componentDidMount() {
		window.onunhandledrejection = (error: any) =>
			this.setState({error, type: 'rejection'});
	}
	componentDidCatch(error: any) {
		console.error('Error:', error);
	}
	componentDidUpdate() {
		if (this.state.type !== 'none') {
			reportError(this.state.error)
				.then(() =>
					console.log('Error was successfully reported:', this.state.error)
				)
				.catch((err) =>
					console.log(
						'Error',
						this.state.error,
						'was unsuccessfully reported because',
						err
					)
				);
		}
	}
	render() {
		if (this.state.type !== 'none') {
			return (
				<Fullscreen>
					<h1>Error</h1>
					{this.state.type === 'rejection' ? (
						<PromiseRejectionDescriptor error={this.state.error} />
					) : (
						<ErrorDescriptor error={this.state.error} />
					)}
				</Fullscreen>
			);
		} else {
			return this.props.children;
		}
	}
}

function PromiseRejectionDescriptor({error}: {error: PromiseRejectionEvent}) {
	if (error.reason instanceof Error) {
		return <ErrorDescriptor error={error.reason} />;
	}

	switch (typeof error.reason) {
		case 'bigint':
		case 'string':
		case 'number':
		case 'boolean':
			return (
				<span>
					Reason: <code>{error.reason}</code>
				</span>
			);
		case 'object':
			return (
				<span>
					Reason: <code>{JSON.stringify(error.reason)}</code>
				</span>
			);
		case 'function':
			return (
				<span>
					Reason: <code>[Function]</code>
				</span>
			);
		case 'symbol':
			return (
				<span>
					Reason: <code>{error.reason.toString()}</code>
				</span>
			);
		case 'undefined':
			return (
				<span>
					Reason: <code>undefined</code>
				</span>
			);
	}

	return (
		<>
			Code: <code>[invalid code]</code>
		</>
	);
}

function ErrorDescriptor({error}: {error: Error}) {
	return (
		<>
			Type: <code>{error.name}</code>
			<br />
			Message: <code>{error.message}</code>
		</>
	);
}
