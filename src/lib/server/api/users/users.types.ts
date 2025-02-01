import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { users } from '../database/schema';

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type UserKey = keyof User;

export type PartialUser = Partial<NewUser>;

export type UserUpdateRequest = PartialUser & {
	payload: PartialUser;
};
