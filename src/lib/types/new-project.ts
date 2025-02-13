export type ImageData = {
	alt: string;
	file: File | null;
};

export type ProjectImageData = ImageData & {
	id: number;
	url: string;
};

export type FormImageState = {
	valid: boolean;
	errors: {
		file?: string[] | undefined;
		alt?: string[] | undefined;
	};
	values: FormImageInputValues;
};

export type FormImageInputValues = ImageData & {
	url: string;
};

export type OnSaveFormImageCallback = (params: ImageData) => boolean;
