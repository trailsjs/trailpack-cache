# trailpack-cache

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-download]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

:package: Cache Trailpack


## Install
### With yeoman :

```sh
npm install -g yo generator-trails
yo trails:trailpack trailpack-cache
```
### With npm (you will have to create config file manually) :
```sh
$ npm install --save trailpack-cache
```

## Configure

```js
// config/main.js
module.exports = {
  packs: [
    // ... other trailpacks
    require('trailpack-cache')
  ]
}
```

## Configuration

```
const mongoStore = require('cache-manager-mongodb')
const redisStore = require('cache-manager-redis')
// config/caches.js
module.exports = {
  stores: [
  // Example for redis Store
  {
    name: 'my-redis-store',
    store: redisStore,
    host: 'localhost',
    auth_pass: ''
    db: 0,
    ttl: 600 // Default TTL
  },
  // Example for memory store
  {
    name: 'memory-store',
    store: 'memory',
    max: 100,
    ttl: 60
  },
  // Example for mongo store
  {
    name: 'mongo-store',
    store: mongoStore,
    options: {
      host: 'localhost',
      port: '27017',
      username: 'username',
      password: 'password',
      database: 'mymondodb',
      collection: 'cacheManager',
      compression: false,
      poolSize: 5,
      auto_reconnect: true
      ttl: 60
    }
  }],

  defaults: ['memory-store']
}
```

For more information about store (type and configuration) please see the cache-manager documentation.

## Usage

```JavaScript
  const myDefaultCache = this.app.services.CacheService.getStore() // Return the first store into defaults config
  myDefaultCache.set('mystoreddata', 'testValue', {ttl: 10}).then(result => {
  return myDefaultCache.get('mystoreddata').then(result => {
        console.log(result)
        // >> 'testValue'
        return myDefaultCache.del('mystoreddata')
    })
  })

```

You can retrieve a specific store by name like this: 
`const myMongoCache = this.app.services.CacheService.getStore('mongo-store')`

You can retrieve a multi caching store like this (without parameters to get multi caching with defaults stores): 
`const myMongoCache = this.app.services.CacheService.getMultiCachingStore(['memory-store', 'mongo-store'])`

## Contributing
We love contributions! Please check out our [Contributor's Guide](https://github.com/trailsjs/trails/blob/master/.github/CONTRIBUTING.md) for more
information on how our projects are organized and how to get started.

## License
[MIT](https://github.com/trailsjs/trailpack-hapi/blob/master/LICENSE)

<img src="http://i.imgur.com/dCjNisP.png">

[npm-image]: https://img.shields.io/npm/v/trailpack-cache.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trailpack-cache
[npm-download]: https://img.shields.io/npm/dt/trailpack-cache.svg
[ci-image]: https://img.shields.io/travis/trailsjs/trailpack-cache/master.svg?style=flat-square
[ci-url]: https://travis-ci.org/trailsjs/trailpack-cache
[daviddm-image]: http://img.shields.io/david/trailsjs/trailpack-cache.svg?style=flat-square
[daviddm-url]: https://david-dm.org/trailsjs/trailpack-cache
[codeclimate-image]: https://img.shields.io/codeclimate/github/trailsjs/trailpack-cache.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/trailsjs/trailpack-cache
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/trailsjs/trails
