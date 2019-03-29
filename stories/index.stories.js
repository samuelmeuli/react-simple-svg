import { storiesOf } from '@storybook/react';
import React from 'react';

import SimpleSvg from '../lib/SimpleSvg.es';
import svgImport from './example-import.svg';
import './style.css';

const svgString = '<svg id="star" xmlns="http://www.w3.org/2000/svg" width="255" height="240" viewBox="0 0 51 48"><path fill="none" stroke="#000" d="M25 1l6 17h18L35 29l5 17-15-10-15 10 5-17L1 18h18z" /></svg>';


storiesOf('Import methods', module)
	.add('Using import', () => (
		<SimpleSvg
			src={svgImport}
			title="Example 1"
			height={100}
			width={100}
			stroke="red"
		/>
	))
	.add('From string', () => (
		<SimpleSvg
			src={svgString}
			title="Example 2"
			height={100}
			width={100}
			stroke="red"
		/>
	))
	.add('From path', () => (
		<SimpleSvg
			src="./example-url.svg#star"
			title="Example 3"
			height={100}
			width={100}
			fill="none"
			stroke="red"
		/>
	));

storiesOf('Props', module)
	.add('Fill opacity', () => (
		<SimpleSvg
			src={svgImport}
			title="Example 1"
			height={100}
			width={100}
			stroke="red"
			fill="red"
			fillOpacity={0.2}
		/>
	))
	.add('Stroke opacity', () => (
		<SimpleSvg
			src={svgImport}
			title="Example 1"
			height={100}
			width={100}
			stroke="red"
			strokeOpacity={0.2}
		/>
	))
	.add('Stroke width', () => (
		<SimpleSvg
			src={svgImport}
			title="Stroke width"
			height={100}
			width={100}
			stroke="red"
			strokeWidth={2}
		/>
	))
	.add('Custom style', () => (
		<SimpleSvg
			src={svgImport}
			title="Example 1"
			height={100}
			width={100}
			stroke="red"
			svgStyle={{
				'stroke-dasharray': 4
			}}
		/>
	));
