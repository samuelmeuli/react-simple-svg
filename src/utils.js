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
export function replaceChildTag(node, childTagName, tagContent) {
	const existingTag = node.getElementsByTagName(childTagName)[0];
	if (existingTag) {
		existingTag.innerHTML = tagContent;
	} else {
		const newTitleTag = document.createElement(childTagName);
		newTitleTag.innerHTML = tagContent;
		node.appendChild(newTitleTag);
	}
}

/**
 * Get object containing the specified HTML node's attributes
 */
export function getAttributes(node) {
	const { attributes } = node;
	const attrObj = {};
	for (let i = 0; i < attributes.length; i += 1) {
		const attr = attributes[i];
		attrObj[attr.name] = attr.value;
	}
	return attrObj;
}

/**
 * Convert a style string (HTML inline styles) to an object (React styles)
 */
export function styleStrToObj(styleStr) {
	const regex = /([\w-]*)\s*:\s*([^;]*)/g;
	let matches = regex.exec(styleStr);
	const styleObj = {};
	while (matches) {
		styleObj[matches[1]] = matches[2].trim();
		matches = regex.exec(styleStr);
	}
	return styleObj;
}
