import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

export const sanitizeMarkdown = (markdown: string) => {
	const html = marked(markdown) as string;
	return DOMPurify.sanitize(html);
};
