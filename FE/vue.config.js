const CnameWebpackPlugin = require('cname-webpack-plugin')
const path = require('path');
const PrerenderSpaPlugin = require('prerender-spa-plugin');

const isProdBuild = process.env.NODE_ENV === 'production'

const webpackPlugins = [
	new CnameWebpackPlugin({
		domain: 'www.sweepsteaks.co.uk',
	})
]

if (isProdBuild) {
	const preRenderPlugin = new PrerenderSpaPlugin({
		staticDir: path.join(__dirname, 'dist'),
		routes: ['/'],
		renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
			// We need to inject a value so we're able to
			// detect if the page is currently pre-rendered.
			inject: {},
			// Our view component is rendered after the API
			// request has fetched all the necessary data,
			// so we create a snapshot of the page after the
			// `data-view` attribute exists in the DOM.
			renderAfterTime: 5000
		})
	})

	webpackPlugins.push(preRenderPlugin)
}

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
		plugins: webpackPlugins
	}
};
