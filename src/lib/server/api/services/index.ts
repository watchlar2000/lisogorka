import { db } from '../database';
import { ProjectRepository } from '../repositories/project/projectRepository';
import { ProjectService } from './project';

const projectRepository = new ProjectRepository(db);
const projectService = new ProjectService(projectRepository);

export const routing = {
	projects: projectService,
};
