import * as envs from '$env/static/private';
import { z } from 'zod';
import { envsDTO, type EnvsDTO } from './env.dto';

export class ConfigService {
	envs: EnvsDTO;

	constructor() {
		this.envs = this.validateEnvs()!;
	}

	private parseEnvs(envs: unknown) {
		return envsDTO.parse(envs);
	}

	validateEnvs() {
		try {
			return this.parseEnvs(envs);
		} catch (error) {
			if (error instanceof z.ZodError) {
				const { fieldErrors } = error.flatten();
				const errorMessage = Object.entries(fieldErrors)
					.map(([field, errors]) =>
						errors ? `${field}: ${errors.join(', ')}` : field,
					)
					.join('\n  ');
				throw new Error(`Missing environment variables:\n  ${errorMessage}`);
			}

			throw new Error('Please double check env variables');
		}
	}
}
