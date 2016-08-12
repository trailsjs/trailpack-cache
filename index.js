'use strict'

const Trailpack = require('trailpack')

module.exports = class CacheTrailpack extends Trailpack {

  /**
   * TODO document method
   */
  validate () {
    if (!this.app.config.caches){
      return Promise.reject(
        new Error('There no cache.js under ./config,' +
          'check it\'s load in ./config/index.js or create it !')
      )
    }
  }

  /**
   * TODO document method
   */
  configure () {

  }

  /**
   * TODO document method
   */
  initialize () {

  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}
