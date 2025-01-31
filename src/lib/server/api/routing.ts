import { DrizzleService } from './database/drizzle.service';
import { ImagesRepository } from './images/images.repository';
import { ImagesService } from './images/images.service';
import { ProjectsRepository } from './projects/projects.repository';
import { ProjectsService } from './projects/projects.service';
import { ProjectsToImagesRepository } from './projectsToImages/projectsToImages.repository';
import { ProjectsToImagesService } from './projectsToImages/projectsToImages.service';
import { SessionsRepository } from './sessions/sessions.repository';
import { SessionsService } from './sessions/sessions.service';
import { UsersRepository } from './users/users.repository';
import { UsersService } from './users/users.service';
import { serviceFactory } from './utils/serviceFactory';

const drizzleFactory = serviceFactory(DrizzleService.db);
const projectService = drizzleFactory(ProjectsRepository, ProjectsService);
const imageService = drizzleFactory(ImagesRepository, ImagesService);
const projectsToImagesService = drizzleFactory(
	ProjectsToImagesRepository,
	ProjectsToImagesService,
);
const sessionsService = drizzleFactory(SessionsRepository, SessionsService);
const usersService = drizzleFactory(UsersRepository, UsersService);

export const routing = {
	projects: projectService,
	projectsToImagesService: projectsToImagesService,
	images: imageService,
	sessions: sessionsService,
	users: usersService,
};
