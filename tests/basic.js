const t = require('tap')

t.test('validator with all available rules', async t => {
  const {
    Validator,
    Rules
  } = require('./../src/lib/validator')

  let validator = new Validator()

  Object.keys(Rules).forEach(k => {
    validator = Rules[k].call(undefined, validator)
  })

  t.test('should not fail using all available rules', async t => {
    await validator.validate('xR2O%9@61uBt75Z')
    t.ok(validator.isValid)
  })

  t.test('should fail with all available rules', async t => {
    const samples = [
      '', 'aa', 'abc123', 'abcdefghij',
      '1234567890', 'ABCDEFGHIJ'
    ]

    for (let i = 0; i < samples.length; i++) {
      await validator.validate(samples[i])
      t.notOk(validator.isValid)
    }
  })
})

t.test('api endpoint', async t => {
  const bootstrap = require('./../src/server')
  const server = await bootstrap({ logger: false })

  t.tearDown(() => server.close())

  t.test('should be healthy', async t => {
    const response = await server.inject({
      method: 'get',
      url: '/health'
    })

    t.strictEqual(response.statusCode, 200)
    t.equal(response.json(), true)
  })

  t.test('should return true', async t => {
    const response = await server.inject({
      method: 'post',
      url: '/check-password',
      payload: { password: 'xR2O%9@61uBt75Z' }
    })

    t.strictEqual(response.statusCode, 200)
    t.equal(response.json(), true)
  })

  t.test('should return false', async t => {
    const response = await server.inject({
      method: 'post',
      url: '/check-password',
      payload: { password: 'abc123' }
    })

    t.strictEqual(response.statusCode, 200)
    t.equal(response.json(), false)
  })
})
