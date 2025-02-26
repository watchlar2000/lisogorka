// import DOMPurify from 'dompurify';
import { marked } from 'marked';

export const markedWithSanitization = (markdown: string) => {
	return marked(markdown);
	// const sanitizedHtml = DOMPurify.sanitize(rawHtml);
};
