module.exports = {
  stores: [
  // Default Memory Store
    {
      name: 'memory-store',
      type: 'memory',
      max: 100,
      ttl: 60
    }],

  defaults: ['memory-store']
}
