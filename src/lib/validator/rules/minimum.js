function MinimumLength (validator, minimum = 9) {
  if (minimum < 1) {
    throw new Error('minimum value must be greater than or equal to 1')
  }

  const fn = validator.validate

  validator.validate = async function (data) {
    await fn.call(validator, data)

    const isValid = data.length >= minimum

    if (!isValid) {
      validator.errors.push(new Error(`Must have at least ${minimum} characters`))
    }
  }

  return validator
}

module.exports = MinimumLength
