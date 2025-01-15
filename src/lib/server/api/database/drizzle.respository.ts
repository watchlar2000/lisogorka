import { DrizzleService } from './drizzle.service';

export abstract class DrizzleRepository {
	protected readonly drizzle: DrizzleService;

	constructor() {
		this.drizzle = new DrizzleService();
	}
}
