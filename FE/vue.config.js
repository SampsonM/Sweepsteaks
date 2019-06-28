const CnameWebpackPlugin = require('cname-webpack-plugin')

module.exports = {
	outputDir: '../docs',
	publicPath: '',
	configureWebpack: {
		plugins: [
			new CnameWebpackPlugin({
			  domain: 'www.sweepstakes.co.uk',
			})
		]
	}
};
