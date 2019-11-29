const CnameWebpackPlugin = require('cname-webpack-plugin')

const webpackPlugins = [
	new CnameWebpackPlugin({
		domain: 'www.sweepsteaks.co.uk',
	})
]

module.exports = {
	outputDir: './dist',

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
		plugins: webpackPlugins
	}
};
