const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withImages = require('next-images')
const withOffline = require('next-offline')
const defaultGetLocalIdent = require('css-loader/lib/getLocalIdent')

const excludedPaths = ['node_modules', 'static']

function excluded(resourcePath) {
  for (let i = 0; i < excludedPaths.length; i++) {
    if (resourcePath.includes(excludedPaths[i])) {
      return true
    }
  }
  return false
}

module.exports = withOffline(
  withImages(
    withCSS(
      withSass({
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          // localIdentName: '[local]___[hash:base64:5]',
          getLocalIdent: (
            loaderContext,
            localIdentName,
            localName,
            options
          ) => {
            if (excluded(loaderContext.resourcePath)) {
              return localName
            } else {
              return defaultGetLocalIdent(
                loaderContext,
                localIdentName,
                localName,
                options
              )
            }
          }
        },
        webpack: (config, options) => {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
          })
          return config
        },
        publicRuntimeConfig: {
          SERVER_NODE_ENV: process.env.NODE_ENV
        }
      })
    )
  )
)
