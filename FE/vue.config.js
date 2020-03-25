const CnameWebpackPlugin = require('cname-webpack-plugin')
const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer

const webpackPlugins = [
	new CnameWebpackPlugin({
		domain: 'www.sweepsteaks.co.uk',
	})
]

module.exports = {
		outputDir: './dist',

    publicPath: '/',

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
