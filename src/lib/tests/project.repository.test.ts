import { ProjectRepository } from '$lib/server/api/projects/project.repository';
import { describe, expect, it, vi } from 'vitest';

describe('Project repository', () => {
	const repo = new ProjectRepository();

	it('listAll should return a list of projects with images', async () => {
		const mockResult = [
			{
				id: 1,
				title: 'Project 1',
				cover_image: { id: 101, url: 'image1.jpg' },
				images: [{ id: 102, url: 'image2.jpg' }],
			},
		];

		vi.spyOn(repo.db, 'execute').mockResolvedValueOnce(mockResult);
		const result = await repo.listAll();
		expect(result).toEqual(mockResult);
	});
});
