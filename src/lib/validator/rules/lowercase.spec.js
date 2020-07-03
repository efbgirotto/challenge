const t = require('tap')
const sinon = require('sinon')

const rule = require('./lowercase')
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

t.test('should have no lowercase characters', async t => {
  const data = '01$NXUC*'
  await rule(validator).validate(data)

  t.equal(validator.errors.length, 1, 'has no lowercase characters')
  t.equal(validator.errors[0].message, 'Must have at least one lowercase character')
})

t.test('should have at least one lowercase character', async t => {
  t.test('only one lowercase character', async t => {
    await rule(validator).validate('kN&PL#$8')
    t.equal(validator.errors.length, 0)
  })

  t.test('more than one lowercase character', async t => {
    await rule(validator).validate('U1na7Z%J')
    t.equal(validator.errors.length, 0)
  })
})

t.test('should not mutate data', async t => {
  let data = 'kN&PL#$8'
  await rule(validator).validate(data)

  t.equal(data, 'kN&PL#$8')

  data = '01$NXUC*'
  await rule(validator).validate(data)

  t.equal(data, '01$NXUC*')
})
