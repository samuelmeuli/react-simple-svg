import React from 'react';
import PropTypes from 'prop-types';

import { appendStyleDef, replaceChildTag } from './utils';


const propTypes = {
	src: PropTypes.string.isRequired,
	height: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	className: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	fill: PropTypes.string,
	fillOpacity: PropTypes.number,
	stroke: PropTypes.string,
	strokeOpacity: PropTypes.number,
	svgStyle: PropTypes.object
};

const defaultProps = {
	className: '',
	title: '',
	description: '',
	fill: null,
	fillOpacity: null,
	stroke: null,
	strokeOpacity: null,
	svgStyle: {}
};


export default function SimpleSvg(props) {
	const {
		src,
		className,
		title,
		description,
		height,
		width,
		fill,
		fillOpacity,
		stroke,
		strokeOpacity,
		svgStyle
	} = props;

	if (!src) {
		throw Error('react-simple-svg: Missing "src" prop');
	}
	if (!height) {
		throw Error('react-simple-svg: Missing "height" prop');
	}
	if (!width) {
		throw Error('react-simple-svg: Missing "width" prop');
	}

	// If src is SVG string
	if (src.startsWith('<svg')) {
		// Generate random class name and apply styles to class
		const randClass = `svg-${Math.random().toString().substring(2)}`;
		let styleDef;
		if (fill || fillOpacity || stroke || strokeOpacity) {
			styleDef = `<![CDATA[
				.${randClass} circle,
				.${randClass} ellipse,
				.${randClass} line,
				.${randClass} path,
				.${randClass} polygon,
				.${randClass} polyline,
				.${randClass} rect {
					${fill ? `fill: ${fill};` : ''}
					${fillOpacity ? `fill-opacity: ${fillOpacity};` : ''}
					${stroke ? `stroke: ${stroke};` : ''}
					${strokeOpacity ? `stroke-opacity: ${strokeOpacity};` : ''}
				}
			]]>`;
		}

		// Convert SVG string to HTML node for access to attributes and children
		const svgWrapper = document.createElement('div');
		svgWrapper.innerHTML = src;
		const svg = svgWrapper.firstElementChild;

		// Update SVG child nodes
		if (title) {
			replaceChildTag(svg, 'title', title);
		}
		if (description) {
			replaceChildTag(svg, 'desc', description);
		}
		if (styleDef) {
			appendStyleDef(svg, styleDef);
		}

		// Update SVG attributes
		// Class
		svg.classList.add(randClass);
		// Dimensions
		svg.style.height = `${height}px`;
		svg.style.width = `${width}px`;
		// Styles
		Object.keys(svgStyle).forEach((key) => {
			svg.style[key] = `${svgStyle[key]}`;
		});

		return (
			<span
				className="svg-wrapper"
				dangerouslySetInnerHTML={{
					__html: svgWrapper.innerHTML
				}}
			/>
		);
	}

	// If src is URL
	return (
		<div>
			<svg
				className={className}
				height={height}
				width={width}
				style={{
					...svgStyle,
					fill,
					fillOpacity,
					stroke,
					strokeOpacity
				}}
			>
				{ title && <title>{title}</title>}
				{ description && <desc>{description}</desc>}
				<use
					xlinkHref={src} // SVG v1.1 (still required by Safari)
					href={src} // SVG v2
					height={height}
					width={width}
				/>
			</svg>
		</div>
	);
}

SimpleSvg.propTypes = propTypes;
SimpleSvg.defaultProps = defaultProps;
