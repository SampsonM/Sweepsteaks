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
    staticDir: path.resolve(__dirname, '..', 'docs'),
    routes: ['/', '/signup'],
    renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
      injectProperty: '__PRERENDER_INJECTED',
      inject: {
        prerendered: true
      },
      renderAfterDocumentEvent: 'render-event'
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
