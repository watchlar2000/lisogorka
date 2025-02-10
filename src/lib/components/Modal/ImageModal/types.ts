import { MODE_CREATE, MODE_EDIT } from '../../../constants';
export type ImageModalMode = typeof MODE_CREATE | typeof MODE_EDIT;

export type ImageModalProps = {
	mode: ImageModalMode;
	imageCallback: ({
		file,
		alt,
		url,
	}: {
		file: File;
		alt: string;
		url: string;
	}) => void;
	// imageCallback:
	// 	| (({ alt, file }: { alt: string; file: File }) => void)
	// 	| (({ alt }: { alt: string }) => void);
	url: string;
	alt: string;
};
