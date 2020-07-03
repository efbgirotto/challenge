// Ref: https://owasp.org/www-community/password-special-characters
const SPECIAL_CHARACTERS = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~".split('')

function SpecialCharacter (validator) {
  const fn = validator.validate

  validator.validate = async function (data) {
    await fn.call(validator, data)

    const isValid = SPECIAL_CHARACTERS.some(e => data.includes(e))

    if (!isValid) {
      validator.errors.push(new Error(`Must have at least one special character of ${SPECIAL_CHARACTERS}`))
    }
  }

  return validator
}

module.exports = SpecialCharacter
