const CnameWebpackPlugin = require('cname-webpack-plugin')
const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer

const webpackPlugins = [
	new CnameWebpackPlugin({
		domain: 'www.sweepsteaks.co.uk',
	})
]

if (process.env.NODE_ENV === 'production') {
	webpackPlugins.push(
		new PrerenderSpaPlugin({
			staticDir: path.join(__dirname, './dist'),
			routes: [ '/', '/login' ],
			renderer: new Renderer({
        headless: true,
        renderAfterDocumentEvent: 'render-event'
      })
		})
	)
}

module.exports = {
	outputDir: './dist',

	publicPath: './',

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
		plugins: webpackPlugins,
	}
};
