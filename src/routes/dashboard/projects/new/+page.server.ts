import {
	editImageAction,
	removeImageAction,
	uploadImageAction,
} from '$lib/server/actions/images';
import { createProjectAction } from '$lib/server/actions/projects';
import { type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	createProject: createProjectAction,
	uploadImage: uploadImageAction,
	editImage: editImageAction,
	removeImage: removeImageAction,
};
