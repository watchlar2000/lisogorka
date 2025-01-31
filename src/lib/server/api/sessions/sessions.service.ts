import type { ISessionsRepository } from './sessions.repository';
import type { NewSession, Session } from './sessions.types';

export interface ISessionsService {
	create(payload: NewSession): Promise<Session>;
	findByToken(token: string): Promise<Session>;
	deleteById(id: number): Promise<Session>;
	deleteByToken(token: string): Promise<Session>;
	updateByToken(token: string, payload: Partial<Session>): Promise<Session>;
}

export class SessionsService implements ISessionsService {
	private repository;

	constructor(sessionsRepository: ISessionsRepository) {
		this.repository = sessionsRepository;
	}

	async create(payload: NewSession): Promise<Session> {
		return this.repository.create(payload);
	}
	async deleteByToken(token: string): Promise<Session> {
		return this.repository.deleteByKey({ token });
	}
	async deleteById(id: number): Promise<Session> {
		return this.repository.deleteByKey({ id });
	}
	async updateByToken(
		token: string,
		payload: Partial<Session>,
	): Promise<Session> {
		return this.repository.updateByKey({ token, payload });
	}
	async findByToken(token: string): Promise<Session> {
		return this.repository.findByKey({ token });
	}
}
