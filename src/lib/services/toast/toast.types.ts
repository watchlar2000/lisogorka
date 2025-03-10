type ToastType = 'success' | 'warning';

export type Toast = {
	id: string;
	title: string;
	message: string;
	type: ToastType;
};

export type AddToastParams = {
	message: string;
	title?: string;
	type?: ToastType;
	duration?: number;
};
