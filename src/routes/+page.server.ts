import { ProjectService } from '$lib/server/api/projects/project.service';
import type { PageServerLoad } from './$types';

const projectService = new ProjectService();

export const load: PageServerLoad = async () => {
	const data = await projectService.listAll({ isFeatured: false });

	return {
		data,
	};
};
