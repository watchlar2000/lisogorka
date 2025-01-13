import { ProjectRepository } from '$lib/server/repositories/project/projectRepository';
import { db } from '..';
import { ProjectService } from './project';

const projectRepository = new ProjectRepository(db);
const projectService = new ProjectService(projectRepository);

export const routing = {
	projects: projectService,
};
