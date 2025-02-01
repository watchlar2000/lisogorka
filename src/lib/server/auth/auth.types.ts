import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { sessions, users } from '../api/database/schema';

export type User = InferSelectModel<typeof users>;
export type Session = InferInsertModel<typeof sessions>;

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };
