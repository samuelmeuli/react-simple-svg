import React from 'react';
import { storiesOf } from '@storybook/react';
import SimpleSvg from '../lib/SimpleSvg';
import svgImport from './example-import.svg';


const size = 100;
const stroke = 'red';
const svgString = '<svg id="star" xmlns="http://www.w3.org/2000/svg" width="255" height="240" viewBox="0 0 51 48"><path fill="none" stroke="#000" d="M25 1l6 17h18L35 29l5 17-15-10-15 10 5-17L1 18h18z" /></svg>';
const svgUrl = 'example-url.svg';


storiesOf('SimpleSvg', module)
	.add('Using import', () => (
		<SimpleSvg
			src={svgImport}
			title="Example 1"
			height={size}
			width={size}
			stroke={stroke}
		/>
	))
	.add('From string', () => (
		<SimpleSvg
			src={svgString}
			title="Example 2"
			height={size}
			width={size}
			stroke={stroke}
		/>
	))
	.add('From path', () => (
		<SimpleSvg
			src={`${svgUrl}#star`}
			title="Example 3"
			height={size}
			width={size}
			fill="none"
			stroke={stroke}
		/>
	));
