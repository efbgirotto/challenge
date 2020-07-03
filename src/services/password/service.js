const {
  Validator,
  Rules
} = require('./../../lib/validator')

async function validatePassword ({ password }) {
  let passwordValidator = new Validator()

  passwordValidator = Rules.MinimumLength(passwordValidator)
  passwordValidator = Rules.Digit(passwordValidator)
  passwordValidator = Rules.Lowercase(passwordValidator)
  passwordValidator = Rules.Uppercase(passwordValidator)
  passwordValidator = Rules.SpecialCharacter(passwordValidator)
  passwordValidator = Rules.Isogram(passwordValidator)

  await passwordValidator.validate(password)

  if (passwordValidator.isValid !== true) {
    return Object.assign(new Error('Bad password'), {
      errors: passwordValidator.errors
    })
  }

  return true
}

module.exports = {
  validatePassword
}
