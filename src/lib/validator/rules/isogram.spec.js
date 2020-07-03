const t = require('tap')
const sinon = require('sinon')

const rule = require('./isogram')
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

t.test('should be an isogram', async t => {
  await rule(validator).validate('AbTp9!fok')
  t.equal(validator.errors.length, 0, 'is an isogram')
})

t.test('should not be an isogram', async t => {
  const samples = [
    'aa', 'AAAbbbCc', 'AbTp9!foo', 'AbTp9!foA'
  ]

  for (let i = 0; i < samples.length; i++) {
    t.test(async t => {
      await rule(validator).validate(samples[i])

      t.equal(validator.errors.length, 1, 'is not an isogram')
      t.equal(validator.errors[0].message, 'Must not contain repeated characters')
    })
  }
})

t.test('should not mutate data', async t => {
  let data = 'AbTp9!fok'
  await rule(validator).validate(data)

  t.equal(data, 'AbTp9!fok')

  data = 'AAAbbbCc'
  await rule(validator).validate(data)

  t.equal(data, 'AAAbbbCc')
})
