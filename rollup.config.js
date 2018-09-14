import babel from 'rollup-plugin-babel';


export default {
	input: 'src/SimpleSvg',
	output: {
		file: 'lib/SimpleSvg.js',
		format: 'cjs'
	},
	external: ['react', 'prop-types'],
	plugins: [
		babel({
			exclude: 'node_modules/**',
			externalHelpers: true
		})
	]
};
