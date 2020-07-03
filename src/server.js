const fastify = require('fastify')
const app = require('./app')

async function bootstrap (options) {
  const server = fastify(options)

  server.register(app)
  // await server.ready()

  return server
}

if (require.main === module) {
  (async () => {
    try {
      const server = await bootstrap({ logger: true })

      const host = process.env.HOST || 'localhost'
      const port = parseInt(process.env.PORT || 3000, 10)

      await server.listen(port, host)
    } catch (ex) {
      console.error(ex)
      process.exit(1)
    }
  })()
}

module.exports = bootstrap
