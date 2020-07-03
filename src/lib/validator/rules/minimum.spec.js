const t = require('tap')
const sinon = require('sinon')

const rule = require('./minimum')
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

t.test('should not have less than 9 characters by default', async t => {
  await rule(validator).validate('03fJ%Q#z')
  t.equal(validator.errors.length, 1, 'less than 9 characters')
  t.equal(validator.errors[0].message, 'Must have at least 9 characters')
})

t.test('should have at least 9 characters by default', async t => {
  await rule(validator).validate('K4f7@!OV#')
  t.equal(validator.errors.length, 0, 'has 9 characters')

  await rule(validator).validate('@bX%9uV0aJ')
  t.equal(validator.errors.length, 0, 'has more than 9 characters')
})

t.test('should have at least 16 characters', async t => {
  await rule(validator, 16).validate('K4f7@!OV#')
  t.equal(validator.errors.length, 1, 'less than 16 characters')
  t.equal(validator.errors[0].message, 'Must have at least 16 characters')
})

t.test('should not mutate data', async t => {
  let data = 'K4f7@!OV#'
  await rule(validator).validate(data)
  t.equal(data, 'K4f7@!OV#')

  data = '03fJ%Q#z'
  await rule(validator).validate(data)
  t.equal(data, '03fJ%Q#z')
})

t.test('ensures that minimum length cannot be less than one', async t => {
  t.throw(() => rule(validator, 0), Error, 'when zero must fail')
  t.throw(() => rule(validator, -1), Error, 'when -1 must fail')
  t.throw(() => rule(validator, Number.MIN_SAFE_INTEGER), Error, `when ${Number.MIN_SAFE_INTEGER} must fail`)
})
