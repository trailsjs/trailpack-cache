'use strict'
/* global describe, it */
const assert = require('assert')

describe('api.services.CacheService', () => {
  it('should exist', () => {
    assert(global.app.api.services.CacheService)
  })

  let CacheService
  before(() => {
    CacheService = global.app.services.CacheService
  })

  describe('Stores', () => {
    it('should retrieve a memory store', () => {
      const memory = CacheService.getStore('memory')
      assert(memory.store.name, 'memory')
      assert(CacheService.storeInstances.memory, memory)
    })

    it('should retrieve a default store', () => {
      const defaults = CacheService.getStore()
      assert(defaults.store.name, global.app.config.caches.defaults[0])
    })

    it('should retrieve an fs store', () => {
      const fs = CacheService.getStore('fs')
      assert(fs.store.name, 'fs')
    })

    it('should retrieve a multi caching store', () => {
      const multi = CacheService.getMultiCachingStore(['memory', 'fs'])
      assert(!multi.store)
    })
  })

  describe('Caches', () => {
    it('should retrieve an undefined value from memory store', () => {
      const memory = CacheService.getStore('memory')
      return memory.get('test').then(result => {
        assert(!result)
      })
    })

    it('should set a value to memory store', () => {
      const memory = CacheService.getStore('memory')
      return memory.set('test', 'ok').then(result => {
        assert(result, 'ok')
      })
    })

    it('should retrieve the value from memory store', () => {
      const memory = CacheService.getStore('memory')
      return memory.get('test').then(result => {
        assert(result, 'ok')
      })
    })

    it('should delete a value from memory store', () => {
      const memory = CacheService.getStore('memory')
      return memory.del('test').then(result => {
        assert(!result)
      })
    })
  })
})
