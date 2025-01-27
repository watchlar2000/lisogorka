import { DrizzleService } from './database/drizzle.service';
import { ImagesRepository } from './images/images.repository';
import { ImagesService } from './images/images.service';
import { ProjectsRepository } from './projects/projects.repository';
import { ProjectsService } from './projects/projects.service';
import { ProjectsToImagesRepository } from './projectsToImages/projectsToImages.repository';
import { ProjectsToImagesService } from './projectsToImages/projectsToImages.service';
import { serviceFactory } from './utils/serviceFactory';

const { db } = new DrizzleService();

const drizzleFactory = serviceFactory(db);
const projectService = drizzleFactory(ProjectsRepository, ProjectsService);
const imageService = drizzleFactory(ImagesRepository, ImagesService);
const projectsToImagesService = drizzleFactory(
	ProjectsToImagesRepository,
	ProjectsToImagesService,
);

export const routing = {
	projects: projectService,
	projectsToImagesService: projectsToImagesService,
	images: imageService,
};
