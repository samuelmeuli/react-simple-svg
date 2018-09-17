/**
 * Generate <defs> tag containing SVG styles
 */
export function appendStyleDef(svgNode, styles) {
	let defsTag = svgNode.getElementsByTagName('defs')[0];
	const styleTag = document.createElement('style');
	styleTag.type = 'text/css';
	styleTag.innerHTML = styles;
	if (!defsTag) {
		defsTag = document.createElement('defs');
		svgNode.appendChild(defsTag);
	}
	defsTag.appendChild(styleTag);
}

/**
 * Overwrite content of specified HTML child node
 */
export function replaceChildTag(node, childTagName, tagContent, mustBeFirstChild) {
	const existingTag = node.getElementsByTagName(childTagName)[0];
	if (existingTag) {
		existingTag.innerHTML = tagContent;
	} else {
		const newTitleTag = document.createElement(childTagName);
		newTitleTag.innerHTML = tagContent;
		if (mustBeFirstChild) {
			node.insertAdjacentElement('afterbegin', newTitleTag);
		} else {
			node.appendChild(newTitleTag);
		}
	}
}
