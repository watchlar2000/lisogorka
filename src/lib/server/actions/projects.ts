import { STATUS_CODE } from '$lib/constants';
import { projectInsertSchema } from '$lib/server/api/projects/projects.types';
import { routing } from '$lib/server/api/routing';
import type { Category } from '$lib/types';
import type { ActionRequestEvent } from '$lib/types/sveltekit';
import { validateWithZod } from '$lib/utils/validateWIthZod';
import { fail } from '@sveltejs/kit';

export const createProjectAction = async (event: ActionRequestEvent) => {
	const fd = await event.request.formData();
	const projectMetaPayload = {
		title: String(fd.get('title')),
		description: String(fd.get('description')),
		category: String(fd.get('category')) as Category,
	};
	const { errors: projectMetaErrors } = validateWithZod({
		data: projectMetaPayload,
		schema: projectInsertSchema,
	});
	const imageIdsList = fd.getAll('imageId').map(Number);

	if (projectMetaErrors || !imageIdsList.length) {
		return fail(STATUS_CODE.BAD_REQUEST, {
			...projectMetaErrors,
			images: !imageIdsList.length ? ['Upload at least one image'] : undefined,
		});
	}

	try {
		const coverImageId = imageIdsList[0];
		const newProjectPayload = {
			...projectMetaPayload,
			coverImageId,
			isFeatured: true,
		};
		const newProject = await routing.projects.create(newProjectPayload);
		await Promise.all(
			imageIdsList.map((imageId) =>
				routing.projectsToImagesService.createRelation({
					projectId: newProject.id,
					imageId,
				}),
			),
		);
		console.log('New project created successfully');
		return { success: true };
	} catch (error) {
		console.log(error);
		return fail(STATUS_CODE.INTERNAL_SERVER_ERROR, {
			errors: 'Failed to create project.',
		});
	}
};

export const editProjectAction = async (event: ActionRequestEvent) => {
	const fd = await event.request.formData();
	const projectId = Number(fd.get('id'));

	if (!projectId)
		return fail(STATUS_CODE.BAD_REQUEST, {
			errors: ['Project ID is required'],
		});

	const projectMetaPayload = {
		title: String(fd.get('title')),
		description: String(fd.get('description')),
		category: String(fd.get('category')) as Category,
	};
	const { errors: projectMetaErrors } = validateWithZod({
		data: projectMetaPayload,
		schema: projectInsertSchema,
	});
	const imageIdsList = fd.getAll('imageId').map(Number);

	if (projectMetaErrors || !imageIdsList.length) {
		return fail(STATUS_CODE.BAD_REQUEST, {
			...projectMetaErrors,
			images: !imageIdsList.length ? ['Upload at least one image'] : undefined,
		});
	}

	const [coverImageId] = imageIdsList;

	try {
		const editProjectPayload = {
			...projectMetaPayload,
			isFeatured: true,
			coverImageId: coverImageId,
		};
		const updatedProject = await routing.projects.update(
			projectId,
			editProjectPayload,
		);
		await Promise.all(
			imageIdsList
				.filter((i) => i)
				.map((imageId) =>
					routing.projectsToImagesService.createRelation({
						projectId: updatedProject.id,
						imageId,
					}),
				),
		);
		console.log('Project updated successfully');
		return { success: true };
	} catch (error) {
		console.log(error);
		return fail(STATUS_CODE.INTERNAL_SERVER_ERROR, {
			errors: 'Failed to create project.',
		});
	}
};
