import { type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	activateProject: (event) => {
		console.log(event);
	},
	deactivateProject: (event) => {
		console.log(event);
	},
};
