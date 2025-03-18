export const PAGE = 'page';
export const MODE_CREATE = 'create';
export const MODE_EDIT = 'edit';
export const SUCCESS = 'success';
export const FAILURE = 'failure';
export const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
export const ACCEPTED_FILE_TYPES = [
	'image/png',
	'image/jpeg',
	'image/jpg',
	'image/gif',
	'image/webp',
	'image/svg+xml',
	'image/bmp',
	'image/tiff',
	'image/x-icon',
	'image/heic',
	'image/heif',
];

export const CATEGORY = {
	BACKGROUND_PAINTING: 'paintings',
	VISUAL_DEVELOPMENT: 'visual-development',
	PLAYGROUND: 'playground',
};

export const categories = [
	'paintings',
	'visual-development',
	'playground',
] as const;

export const STATUS_CODE = {
	OK: 200,
	CREATED: 201,
	NO_CONTENT: 204,
	REDIRECT: 302,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	TOO_MANY_REQUESTS: 429,
	INTERNAL_SERVER_ERROR: 500,
};
