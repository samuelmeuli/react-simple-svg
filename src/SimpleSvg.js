import React from 'react';
import PropTypes from 'prop-types';

import { appendStyleDef, getAttributes, replaceChildTag, styleStrToObj } from './utils';


const propTypes = {
	src: PropTypes.string.isRequired,
	className: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	height: PropTypes.number,
	width: PropTypes.number,
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
	height: null,
	width: null,
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

	// If src is SVG string
	if (src.startsWith('<svg')) {
		// Generate random class name and apply styles to class
		const randClass = `svg-${Math.random().toString().substring(2)}`;
		const styles = `<![CDATA[
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
		appendStyleDef(svg, styles);

		// Update SVG attributes
		const svgAttrs = getAttributes(svg);
		// Class
		const existingClasses = svgAttrs.class || '';
		delete svgAttrs.class;
		svgAttrs.className = `${existingClasses} ${randClass}`;
		// Dimensions
		svgAttrs.height = height || null;
		svgAttrs.width = width || null;
		// Styles
		const existingStyles = styleStrToObj(svgAttrs.style);
		delete svgAttrs.style;

		return (
			<svg
				dangerouslySetInnerHTML={{
					__html: svg.innerHTML
				}}
				style={{ ...existingStyles, ...svgStyle }}
				{...svgAttrs}
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
