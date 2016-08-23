'use strict'
/* global describe, it */
const assert = require('assert')

describe('api.services.CacheService', () => {
  it('should exist', () => {
    assert(global.app.api.services['CacheService'])
  })

  let CacheService
  before(() => {
    CacheService = global.app.services.CacheService
  })

  describe('#getersetter', () => {
    it('should insert a record in cache', () => {
      const testCache = CacheService.getCaches()
      testCache.set('varname', 'valuedata', {ttl: 10}, function(err){
        if (err) { throw err }
        describe('#setter', () => {
          it('should not return error on setting cache value',() => {
            assert.strictEqual(err, undefined, 'Cache Setter return errors')
          })
        })
        testCache.get('varname', function(err, result) {
          describe('#getter', () => {
            it('should not return error on getting cache value', () => {
              assert.strictEqual(err, null, 'Cache getter return errors')
            })
          })
          assert.equal(result, 'valuedata')
          testCache.del('varname', function(err) {})
        })
      })
    })
  })
})
