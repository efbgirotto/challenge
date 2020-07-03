const t = require('tap')
const sinon = require('sinon')

const rule = require('./specialChar')
let validator

t.beforeEach(async t => {
  validator = {
    errors: [],
    validate: sinon.spy()
  }
})

t.test('interface', async t => {
  t.type(rule, 'function')
  t.type(rule(validator).validate, 'function')
})

t.test('should call decorated validation function', async t => {
  const spy = validator.validate
  await rule(validator).validate('any')

  t.ok(spy.calledWith('any'))
})

t.test('should have no special characters', async t => {
  await rule(validator).validate('Gw84858Q')

  t.equal(validator.errors.length, 1, 'has no special characters')
  t.ok(validator.errors[0].message.startsWith('Must have at least one special character of'))
})

t.test('should have at least one special character', async t => {
  t.test('only one special character', async t => {
    await rule(validator).validate('tT93!q@b')
    t.equal(validator.errors.length, 0)
  })

  t.test('more than one special characters', async t => {
    await rule(validator).validate('75Z@%YdA')
    t.equal(validator.errors.length, 0)
  })
})

t.test('should not mutate data', async t => {
  let data = 'tT93!q@b'
  await rule(validator).validate(data)

  t.equal(data, 'tT93!q@b')

  data = 'Gw84858Q'
  await rule(validator).validate(data)

  t.equal(data, 'Gw84858Q')
})
