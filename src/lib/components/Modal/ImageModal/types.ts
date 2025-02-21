export type ImageModalData = {
	id: number;
	url: string;
	alt: string;
	file?: File;
};

export type ImageModalSaveParams = ImageModalData;

export type ImageModalProps = Partial<ImageModalData> & {
	onSaveCallback: (params: ImageModalSaveParams) => void;
};
