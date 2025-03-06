export type ImageModalData = {
	id: number;
	alt: string;
	url?: string;
	file?: File;
};

export type ImageModalSaveParams = ImageModalData;

export type ImageModalProps = Partial<ImageModalData> & {
	onSaveCallback: (params: ImageModalSaveParams) => void;
	loading?: boolean;
};
