export type ProjectImageData = {
	id: number;
	url: string;
	alt: string;
	file: File | null;
};

export type FormImageState = {
	valid: boolean;
	errors: {
		file?: string[] | undefined;
		alt?: string[] | undefined;
	};
	values: FormImageInputValues;
};

export type FormImageInputValues = {
	file: File | null;
	alt: string;
	url: string;
};

export type OnSaveFormImageCallback = (params: {
	alt: string;
	file: File | null;
}) => boolean;
