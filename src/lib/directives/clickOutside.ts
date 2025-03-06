export const clickOutside = (node: HTMLElement, callback: () => void) => {
	const handleClick = (event: Event) => {
		if (!node.contains(event.target as HTMLElement)) {
			callback();
		}
	};
	document.addEventListener('click', handleClick);
	return {
		destroy() {
			document.removeEventListener('click', handleClick);
		},
	};
};
