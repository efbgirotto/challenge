const {
  healthStatus: healthStatusSchema
} = require('./schemas')

module.exports = async function healthRoutes (app, options) {
  app.get('/health', { schema: healthStatusSchema }, healthStatusHandler)
}

async function healthStatusHandler (req, reply) {
  // Simplesmente retorna True para poder informar que a aplicação está
  // funcional. Em uma aplicação mais complexa, onde existam conexões com
  // banco de dados, serviços externos, etc, é interessante ter um serviço
  // dedicado para verificação da saúde da aplicação.

  return true
}
