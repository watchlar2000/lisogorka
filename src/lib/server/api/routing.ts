import { DrizzleService } from './database/drizzle.service';
import { ImageRepository } from './images/image.repository';
import { ImageService } from './images/image.service';
import { ProjectRepository } from './projects/project.repository';
import { ProjectService } from './projects/project.service';
import { ProjectsToImagesRepository } from './projectsToImages/projectsToImages.repository';
import { ProjectsToImagesService } from './projectsToImages/projectsToImages.service';
import { serviceFactory } from './utils/serviceFactory';

const { db } = new DrizzleService();

const drizzleFactory = serviceFactory(db);
const projectService = drizzleFactory(ProjectRepository, ProjectService);
const imageService = drizzleFactory(ImageRepository, ImageService);
const projectsToImagesService = drizzleFactory(
	ProjectsToImagesRepository,
	ProjectsToImagesService,
);

export const routing = {
	projects: projectService,
	projectsToImagesService: projectsToImagesService,
	images: imageService,
};
