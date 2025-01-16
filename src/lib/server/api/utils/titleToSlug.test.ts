import { describe, expect, it } from 'vitest';
import { titleToSlug } from './titleToSlug';

describe('titleToSLug functionality', () => {
	it('Expect to return a proper slug based on the given input - title', () => {
		const res = titleToSlug('My first project');

		expect(res).toBe('my-first-project');
	});

	it('Expect to return an empty string if param contains whitespaces only', () => {
		const res = titleToSlug('    ');

		expect(res).toBe('');
	});

	it('Expect to remove special characters from the title', () => {
		const res = titleToSlug('!!Test: Special @characters#');

		expect(res).toBe('test-special-characters');
	});

	it('Expect to return a valid slug for a single word', () => {
		const res = titleToSlug('Project');

		expect(res).toBe('project');
	});

	it('Expect to replace multiple consecutive spaces with a single hyphen', () => {
		const res = titleToSlug('My   project   name');

		expect(res).toBe('my-project-name');
	});

	it('Expect to trim leading and trailing spaces', () => {
		const res = titleToSlug('   Leading and trailing spaces   ');

		expect(res).toBe('leading-and-trailing-spaces');
	});

	it('Expect to merge consecutive hyphens into one', () => {
		const res = titleToSlug('Hello -- World  !!');

		expect(res).toBe('hello-world');
	});

	it('Expect to include numbers in the slug', () => {
		const res = titleToSlug('Project 1234 Test');

		expect(res).toBe('project-1234-test');
	});

	it('Expect to convert the title to lower case', () => {
		const res = titleToSlug('MiXeD CaSe ExAmPlE');

		expect(res).toBe('mixed-case-example');
	});

	it('Expect to return the title with hyphens unchanged if already present', () => {
		const res = titleToSlug('my-project-name');

		expect(res).toBe('my-project-name');
	});
});
