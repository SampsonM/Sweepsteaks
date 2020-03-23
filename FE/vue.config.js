const CnameWebpackPlugin = require('cname-webpack-plugin')
const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-plugin')

const webpackPlugins = [
	new CnameWebpackPlugin({
		domain: 'www.sweepsteaks.co.uk',
	})
]

// if (process.env.NODE_ENV === 'production') {
// 	webpackPlugins.push(new PrerenderSpaPlugin(
// 		path.join(__dirname, './dist'),
// 		[ '/' ]
// 	))
// }

module.exports = {
	outputDir: './dist',

	publicPath: '',

	css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles/_vars.scss";
					@import "@/assets/styles/_mixins.scss";
        `
      }
    }
  },

	configureWebpack: {
		entry: {
			app: path.resolve(__dirname, './src/main.js')
		},
	
		plugins: webpackPlugins
	}
};
