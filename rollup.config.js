import babel from 'rollup-plugin-babel';

import pkg from './package.json';


export default {
	input: 'src/SimpleSvg',
	output: [
		{
			file: pkg.main,
			format: 'cjs'
		},
		{
			file: pkg.module,
			format: 'es'
		}
	],
	external: ['react', 'prop-types'],
	plugins: [
		babel({
			exclude: 'node_modules/**',
			externalHelpers: true
		})
	]
};
