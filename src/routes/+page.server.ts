import { ImageService } from '$lib/server/api/images/image.service';
import { ProjectService } from '$lib/server/api/projects/project.service';
import type { PageServerLoad } from './$types';

const projectService = new ProjectService();
const imageService = new ImageService();

export const load: PageServerLoad = async () => {
	// const data = await projectService.listAll({ isFeatured: false });
	const data = await imageService.listAll();

	return {
		data,
	};
};
