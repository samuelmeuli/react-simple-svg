import babel from 'rollup-plugin-babel';


export default {
	input: 'src/MyComponent',
	output: {
		file: 'lib/MyComponent.js',
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
