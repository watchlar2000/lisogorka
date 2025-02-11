type ImageData = {
	alt: string;
	url: string;
	file: File | null;
};

type OnSaveParams = ImageData;

export type ImageModalProps = ImageData & {
	onSave: (params: OnSaveParams) => void;
};

export type FormState = {
	valid: boolean;
	errors: {
		file?: string[] | undefined;
		alt?: string[] | undefined;
	};
	values: ImageData;
};
