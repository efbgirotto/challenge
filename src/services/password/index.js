const passwordService = require('./service')

const {
  checkPassword: checkPasswordSchema
} = require('./schemas')

module.exports = async function passwordRoutes (app, options) {
  app.post('/check-password', { schema: checkPasswordSchema }, checkPasswordHandler)
}

async function checkPasswordHandler (req, reply) {
  const { password } = req.body

  const validation = await passwordService.validatePassword({ password })

  // Na descrição do desafio é dito que a API precisa retornar true ou false apenas
  // porém numa implementação completa deveríamos retornar quais foram os problemas
  // com a validação para que o usuário possa ter a possibilidade de corrigir esses
  // problemas, tornando assim a API mais amigável.

  return validation === true // retorna true ou false na API conforme espec do desafio
}
