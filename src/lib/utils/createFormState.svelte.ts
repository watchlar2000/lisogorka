import type { z, ZodObject, ZodRawShape } from 'zod';

type FormState<T> = {
	data: T;
	errors: Partial<Record<keyof T, string>>;
	valid: boolean;
};

type Options = {
	required?: boolean;
};

type FormStateParams<U extends ZodObject<ZodRawShape>> = {
	zodSchema: U | (() => U);
	defaultDataValues: Partial<z.infer<U>> & { id: number };
};

export const createFormState = <U extends ZodObject<ZodRawShape>>({
	zodSchema,
	defaultDataValues,
}: FormStateParams<U>) => {
	const formState: FormState<z.infer<U>> = $state({
		data: { ...defaultDataValues },
		errors: {},
		valid: false,
	});
	const touchedFields = new Set<keyof z.infer<U>>();

	const validate = (name?: keyof z.infer<U>) => {
		const schema = typeof zodSchema === 'function' ? zodSchema() : zodSchema;

		if (!name) {
			for (const key of Object.keys(schema.shape) as (keyof z.infer<U>)[]) {
				validate(key);
			}
		} else {
			const value = formState.data[name];

			const fieldSchema = schema.shape[name as string];
			const { success, error } = fieldSchema.safeParse(value);

			if (!success) {
				formState.errors[name] = error.flatten().formErrors.join(', ');
			} else {
				delete formState.errors?.[name];
			}
		}
	};

	const handleSubmit = (callback: () => void) => {
		validate();
		formState.valid = Object.keys(formState.errors).length === 0;

		if (formState.valid) {
			callback();
		}
	};

	const register = (name: keyof z.infer<U>, options?: Options) => {
		return {
			onchange: () => {
				validate(name);
				touchedFields.add(name);
			},
			oninput: () => {
				if (!touchedFields.has(name)) return;
				validate(name);
			},
			['aria-invalid']: !!formState.errors[name],
			['aria-describedby']: formState.errors[name] ?? undefined,
			required: options?.required ?? undefined,
			autofocus: !!formState.errors[name],
			id: name,
			name: name,
		};
	};

	const resetFormState = () => {
		formState.data = {};
		formState.errors = {};
		formState.valid = false;
		touchedFields.clear();
	};

	const resetDefaultDataValues = (
		values: Partial<z.infer<U>> & { id: number },
	) => {
		formState.data = { ...values };
	};

	return {
		register,
		formState,
		resetFormState,
		resetDefaultDataValues,
		handleSubmit,
	};
};
