const path = require("path");

module.exports = {
	module: {
		rules: [
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader',
				include: path.resolve(__dirname, "../")
			}
		]
	}
};
