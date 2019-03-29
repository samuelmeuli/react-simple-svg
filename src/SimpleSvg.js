import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { appendStyleDef, replaceChildTag } from './utils';


const propTypes = {
	src: PropTypes.string.isRequired,
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	className: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	role: PropTypes.string,
	fill: PropTypes.string,
	fillOpacity: PropTypes.number,
	stroke: PropTypes.string,
	strokeOpacity: PropTypes.number,
	strokeWidth: PropTypes.number,
	svgStyle: PropTypes.object
};

const defaultProps = {
	className: '',
	height: null,
	width: 100,
	title: '',
	description: '',
	role: 'img',
	fill: null,
	fillOpacity: null,
	stroke: null,
	strokeOpacity: null,
	strokeWidth: null,
	svgStyle: {}
};


export default class SimpleSvg extends PureComponent {
	render() {
		const {
			src,
			className,
			title,
			description,
			role,
			height,
			width,
			fill,
			fillOpacity,
			stroke,
			strokeOpacity,
			strokeWidth,
			svgStyle
		} = this.props;

		if (!src) {
			throw Error('react-simple-svg: Missing "src" prop');
		}

		// If src is SVG string
		if (src.startsWith('<svg')) {
			// Generate random class name and apply styles to class
			const randClass = `svg-${Math.random().toString().substring(2)}`;
			let styleDef;
			if (fill || fillOpacity || stroke || strokeOpacity || strokeWidth) {
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
						${strokeWidth ? `stroke-width: ${strokeWidth};` : ''}
					}
				]]>`;
			}

			// Convert SVG string to HTML node for access to attributes and children
			const svgWrapper = document.createElement('div');
			svgWrapper.innerHTML = src;
			const svg = svgWrapper.firstElementChild;

			// Update SVG child nodes
			if (title) {
				replaceChildTag(svg, 'title', title, true);
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
			if (className) {
				svg.classList.add(className);
			}
			// Role
			svg.setAttribute('role', role);
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
			<svg
				className={className}
				height={height}
				width={width}
				role={role}
				style={{
					...svgStyle,
					fill,
					fillOpacity,
					stroke,
					strokeOpacity,
					strokeWidth
				}}
			>
				{ title && <title>{title}</title>}
				{ description && <desc>{description}</desc>}
				<use
					xlinkHref={src} // SVG v1.1 (still required by Safari)
					href={src} // SVG v2
					height="100%"
					width="100%"
				/>
			</svg>
		);
	}
}

SimpleSvg.propTypes = propTypes;
SimpleSvg.defaultProps = defaultProps;
