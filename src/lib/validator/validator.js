class Validator {
  constructor () {
    this.errors = []
  }

  get isValid () {
    return this.errors.length === 0
  }

  async validate (data) {
    this.errors.length = 0

    if (data === '') {
      this.errors.push(new Error('Must not be empty'))
    }
  }
}

module.exports = Validator
