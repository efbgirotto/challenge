const t = require('tap')

const Validator = require('./validator')
const validator = new Validator()

t.type(validator, Validator)
t.type(validator.errors, Array)
t.type(validator.isValid, 'boolean')
t.type(validator.validate, 'function')

t.test('should validate with success when not empty', async t => {
  await validator.validate('s4mpl3')

  t.ok(validator.isValid)
  t.equal(validator.errors.length, 0)
})

t.test('should validate with error when empty', async t => {
  await validator.validate('')

  t.notOk(validator.isValid)
  t.equal(validator.errors.length, 1)
  t.equal(validator.errors[0].message, 'Must not be empty')
})

t.test('errors should respect multiple validations calls', async t => {
  const data = ''

  for (let i = 0; i < 3; i++) {
    await validator.validate(data)

    t.notOk(validator.isValid)
    t.equal(validator.errors.length, 1)
    t.equal(validator.errors[0].message, 'Must not be empty')
  }
})
