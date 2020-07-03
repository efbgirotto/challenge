const checkPassword = {
  body: {
    type: 'object',
    required: ['password'],
    properties: {
      password: {
        type: 'string'
      }
    }
  },
  response: {
    200: {
      type: 'boolean'
    },
    422: {
      type: 'boolean'
    }
  }
}

module.exports = {
  checkPassword
}
