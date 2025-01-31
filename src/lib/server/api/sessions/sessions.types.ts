import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { sessions } from '../database/schema';
import type { User } from '../users/users.types';

export type Session = InferSelectModel<typeof sessions>;
export type NewSession = InferInsertModel<typeof sessions>;

export type SessionKey = 'id' | 'token';

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };
