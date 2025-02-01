import type { IUsersRepository } from './users.repository';
import type { NewUser, User } from './users.types';

export interface IUsersService {
	create(payload: NewUser): Promise<User>;
	findById(id: number): Promise<User>;
	findByGoogleId(googleId: string): Promise<User>;
}

export class UsersService implements IUsersService {
	private repository;

	constructor(usersRepository: IUsersRepository) {
		this.repository = usersRepository;
	}

	async create(payload: NewUser) {
		return this.repository.create(payload);
	}
	async findById(id: number): Promise<User> {
		return this.repository.findByKey({ id });
	}
	async findByGoogleId(googleId: string): Promise<User> {
		return this.repository.findByKey({ googleId });
	}
}
