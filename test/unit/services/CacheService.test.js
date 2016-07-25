'use strict'
/* global describe, it */
const assert = require('assert')

describe('CacheService', () => {
  it('should exist', () => {
    assert(global.app.api.services['CacheService'])
  })
})
