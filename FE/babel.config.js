module.exports = {
  presets: [
    [
      '@vue/app', 
      {
        polyfills: [
          'es6.array.iterator',
          'es6.promise'
        ]
      }
    ]
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import'
  ]
}
