const LOWERCASE_REGEX = /[a-z]/

function Lowercase (validator) {
  const fn = validator.validate

  validator.validate = async function (data) {
    await fn.call(validator, data)

    const isValid = LOWERCASE_REGEX.test(data)

    if (!isValid) {
      validator.errors.push(new Error('Must have at least one lowercase character'))
    }
  }

  return validator
}

module.exports = Lowercase
