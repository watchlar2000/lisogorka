import { error } from '@sveltejs/kit';
import { STATUS_CODE } from './statusCodes';

export const TooManyRequests = (message: string = 'Too many requests') => {
	return error(STATUS_CODE.TOO_MANY_REQUESTS, { message });
};

export const Forbidden = (message: string = 'Forbidden') => {
	return error(STATUS_CODE.FORBIDDEN, { message });
};

export const Unauthorized = (message: string = 'Unauthorized') => {
	return error(STATUS_CODE.UNAUTHORIZED, { message });
};

export const NotFound = (message: string = 'Not Found') => {
	return error(STATUS_CODE.NOT_FOUND, { message });
};

export const BadRequest = (message: string = 'Bad Request') => {
	return error(STATUS_CODE.BAD_REQUEST, { message });
};

export const InternalError = (message: string = 'Internal Error') => {
	return error(STATUS_CODE.INTERNAL_SERVER_ERROR, { message });
};
