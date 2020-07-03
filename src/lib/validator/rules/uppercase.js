const UPPERCASE_REGEX = /[A-Z]/

function Uppercase (validator) {
  const fn = validator.validate

  validator.validate = async function (data) {
    await fn.call(validator, data)

    const isValid = UPPERCASE_REGEX.test(data)

    if (!isValid) {
      validator.errors.push(new Error('Must have at least one uppercase character'))
    }
  }

  return validator
}

module.exports = Uppercase
