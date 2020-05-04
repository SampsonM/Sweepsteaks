const functions = require('firebase-functions')
const { Nuxt } = require('nuxt-start')

const nuxtConfig = require('./nuxt.config.js')

const config = {
  ...nuxtConfig,
  dev: false,
  debug: false,
  buildDir: 'nuxt',
}
const nuxt = new Nuxt(config)

exports.ssrapp = functions.https.onRequest(async (req, res) => {
	await nuxt.ready()
	// res.set('Cache-control', 'max-age=600 s-max-age=1200')
  nuxt.render(req, res)
})
