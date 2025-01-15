import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';
import { pgEnum, pgTable as table } from 'drizzle-orm/pg-core';
import { categories } from '../types/types';
import { timestamps } from '../utils/drizzle';

export const authors = table('authors', {
	id: t.serial('id').primaryKey(),
	name: t.varchar('name').notNull(),
	surname: t.varchar('surname'),
	photoUrl: t.varchar('photo_url').notNull(),
	about: t.text('about').notNull(),
	...timestamps,
});

export const categoryEnum = pgEnum('category', categories);

export const projects = table('projects', {
	id: t.serial('id').primaryKey(),
	title: t.varchar('title').notNull(),
	slug: t.varchar('slug').notNull().unique(),
	description: t.varchar('description'),
	category: categoryEnum('category').notNull(),
	coverImageId: t
		.integer('cover_image_id')
		.notNull()
		.references(() => images.id),
	isFeatured: t.boolean('is_featured').default(false),
	...timestamps,
});

export const projectsRelations = relations(projects, ({ one, many }) => ({
	coverImage: one(images, {
		fields: [projects.coverImageId],
		references: [images.id],
	}),
	images: many(projectsToImages),
}));

export const images = table('images', {
	id: t.serial('id').primaryKey(),
	url: t.varchar('url').notNull(),
	alt: t.varchar('alt').notNull(),
	width: t.integer('width').notNull(),
	height: t.integer('height').notNull(),
	...timestamps,
});

export const imagesRelations = relations(images, ({ many }) => ({
	projects: many(projectsToImages),
}));

export const projectsToImages = table('projects_to_images', {
	projectId: t
		.integer('project_id')
		.notNull()
		.references(() => projects.id, { onDelete: 'cascade' }),
	imageId: t
		.integer('image_id')
		.notNull()
		.references(() => images.id, { onDelete: 'cascade' }),
});

export const projectsToImagesRelations = relations(
	projectsToImages,
	({ one }) => ({
		project: one(projects, {
			fields: [projectsToImages.projectId],
			references: [projects.id],
		}),
		image: one(images, {
			fields: [projectsToImages.imageId],
			references: [images.id],
		}),
	}),
);