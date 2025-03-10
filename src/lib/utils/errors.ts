export class ValidationError extends Error {
	originalError?: unknown;

	constructor(message: string, originalError?: unknown) {
		super(message);
		this.name = 'ValidationError';
		this.originalError = originalError;
	}
}

export class DatabaseError extends Error {
	originalError?: unknown;

	constructor(message: string, originalError?: unknown) {
		super(message);
		this.name = 'DatabaseError';
		this.originalError = originalError;
	}
}

export class NotFoundError extends Error {
	originalError?: unknown;

	constructor(message: string, originalError?: unknown) {
		super(message);
		this.name = 'NotFoundError';
		this.originalError = originalError;
	}
}
