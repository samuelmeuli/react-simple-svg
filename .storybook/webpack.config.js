const path = require('path');


module.exports = {
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
				]
			},
			{
				test: /\.stories\.jsx?$/,
				loaders: [require.resolve('@storybook/addon-storysource/loader')],
				enforce: 'pre',
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader',
				include: path.resolve(__dirname, '../')
			}
		]
	}
};
