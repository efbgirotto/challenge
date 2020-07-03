const t = require('tap')
const sinon = require('sinon')

const rule = require('./uppercase')

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

t.test('should have no uppercase characters', async t => {
  await rule(validator).validate('9%7xz!t5')

  t.equal(validator.errors.length, 1, 'has no uppercase characters')
  t.equal(validator.errors[0].message, 'Must have at least one uppercase character')
})

t.test('should have at least one uppercase character', async t => {
  t.test('only one uppercase character', async t => {
    await rule(validator).validate('tT93!q@b')
    t.equal(validator.errors.length, 0)
  })

  t.test('more than one uppercase character', async t => {
    await rule(validator).validate('75Z@%YdA')
    t.equal(validator.errors.length, 0)
  })
})

t.test('should not mutate data', async t => {
  let data = 'tT93!q@b'
  await rule(validator).validate(data)

  t.equal(data, 'tT93!q@b')

  data = '9%7xz!t5'
  await rule(validator).validate(data)

  t.equal(data, '9%7xz!t5')
})
