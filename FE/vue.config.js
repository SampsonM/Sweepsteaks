const CnameWebpackPlugin = require('cname-webpack-plugin')

module.exports = {
	outputDir: '../docs',

	publicPath: '',

	css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/_vars.scss";
					@import "@/styles/_mixins.scss";
					@import "@/styles/_global.scss";
        `
      }
    }
  },

	configureWebpack: {
		plugins: [
			new CnameWebpackPlugin({
			  domain: 'www.sweepsteaks.co.uk',
			})
		]
	}
};
