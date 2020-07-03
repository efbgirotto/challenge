const DIGIT_REGEX = /\d/

function Digit (validator) {
  const fn = validator.validate

  validator.validate = async function (data) {
    await fn.call(validator, data)

    const isValid = DIGIT_REGEX.test(data)

    if (!isValid) {
      validator.errors.push(new Error('Must have at least one digit'))
    }
  }

  return validator
}

module.exports = Digit
