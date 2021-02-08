import {useEffect, useState} from 'react';
import injectTheme from './styles/injectTheme';
import {DarkTheme, LightTheme} from './styles/theme';

export default function ThemeProvider({children}: {children: React.ReactNode}) {
	let [theme] = useState('dark');

	useEffect(() => {
		if (theme === 'dark') {
			injectTheme(DarkTheme);
		} else if (theme === 'light') {
			injectTheme(LightTheme);
		}
		document.body.classList.add('theme-' + theme);
		return () => {
			document.body.classList.remove('theme-' + theme);
		};
	}, [theme]);

	return <>{children}</>;
}
