import { STATUS_CODE } from '$lib/constants';
import { redirect } from '@sveltejs/kit';

export const load = () => {
	redirect(STATUS_CODE.REDIRECT, '/dashboard/projects');
};
