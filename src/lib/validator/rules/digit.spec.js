const t = require('tap')
const sinon = require('sinon')

const rule = require('./digit')
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

t.test('should have no digits', async t => {
  await rule(validator).validate('w@Jd^#I*')

  t.equal(validator.errors.length, 1, 'has no digits')
  t.equal(validator.errors[0].message, 'Must have at least one digit')
})

t.test('should have at least one digit', async t => {
  t.test('only one digit', async t => {
    await rule(validator).validate('Hw!0$sIH')
    t.equal(validator.errors.length, 0)
  })

  t.test('more than one digit', async t => {
    await rule(validator).validate('uG0!33oe')
    t.equal(validator.errors.length, 0)
  })
})

t.test('should not mutate data', async t => {
  let data = 'Hw!0$sIH'
  await rule(validator).validate(data)

  t.equal(data, 'Hw!0$sIH')

  data = 'w@Jd^#I*'
  await rule(validator).validate(data)

  t.equal(data, 'w@Jd^#I*')
})
