import {IEvent} from './EventSchedule';

export const gamenight: IEvent = {
	title: 'Game Night',
	schedule: [
		{
			id: '0',
			title: 'Beginning of Game Night',
			startTime: 'now',
			endTime: 'later',
			description: 'Welcome to the Game Night!',
			url: 'https://www.google.com/',
			active: true,
		},
		{
			id: '1',
			title: 'Chess Tournament',
			startTime: '12:00 AM',
			endTime: '2:00 AM',
			active: false,
		},
	],
};
