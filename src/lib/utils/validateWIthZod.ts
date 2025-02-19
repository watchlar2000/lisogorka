import type { inferFlattenedErrors, z, ZodTypeAny } from 'zod';

// export const validateWithZod = <T extends ZodTypeAny>(params: {
// 	schema: T;
// 	data: unknown;
// }) => {
// 	const { schema, data } = params;
// 	const { success, error } = schema.safeParse(data);

// 	if (!success) {
// 		return {
// 			errors: error.flatten().fieldErrors,
// 			success: false,
// 		};
// 	}

// 	return {
// 		errors: null,
// 		success: true,
// 	};
// };

export const validateWithZodV2 = <T extends ZodTypeAny>(params: {
	schema: T;
	data: unknown;
}) => {
	const { schema, data } = params;
	const result = schema.safeParse(data);

	if (!result.success) {
		const flattenErrors = result.error.flatten() as inferFlattenedErrors<T>;
		return {
			errors: flattenErrors.fieldErrors,
			data: null,
		};
	}

	return {
		errors: null,
		data: result.data as z.infer<T>,
	};
};
