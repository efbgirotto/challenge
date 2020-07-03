function Isogram (validator) {
  const fn = validator.validate

  validator.validate = async function (data) {
    await fn.call(validator, data)

    const isValid = data.split('').every((c, i) => data.indexOf(c) === i)

    if (!isValid) {
      validator.errors.push(new Error('Must not contain repeated characters'))
    }
  }

  return validator
}

module.exports = Isogram
