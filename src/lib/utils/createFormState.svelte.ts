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
	zodSchema: U;
	defaultDataValues: Partial<z.infer<U>>;
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

	$effect(() => {
		formState.valid = Object.keys(formState.errors).length === 0;
	});

	const validate = (name: keyof z.infer<U>) => {
		const value = formState.data[name];
		const fieldSchema = zodSchema.shape[name as string];
		const { success, error } = fieldSchema.safeParse(value);

		if (!success) {
			formState.errors[name] = error.flatten().formErrors.join(', ');
		} else {
			delete formState.errors?.[name];
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
			required: options?.required ?? false,
			autofocus: !!formState.errors[name],
		};
	};

	const resetFormState = () => {
		formState.data = { ...defaultDataValues };
		formState.errors = {};
		formState.valid = false;
		touchedFields.clear();
	};

	const resetDefaultDataValues = (defaultDataValues: Partial<z.infer<U>>) => {
		formState.data = { ...defaultDataValues };
	};

	return { register, formState, resetFormState, resetDefaultDataValues };
};
