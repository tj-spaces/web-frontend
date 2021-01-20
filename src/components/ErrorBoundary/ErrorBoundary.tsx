import React from 'react';
import ErrorScreen from '../ErrorScreen/ErrorScreen';

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
	try {
		return <>{children}</>;
	} catch {
		return <ErrorScreen />;
	}
}
