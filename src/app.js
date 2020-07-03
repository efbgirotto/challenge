const fs = require('fs')
const path = require('path')

async function app (server) {
  await server
    .register(require('fastify-cors'))
    .register(require('fastify-helmet'))
    .register(require('fastify-formbody'))

  const p = path.resolve(__dirname, './services')
  const dir = await fs.promises.opendir(p)

  for await (const entry of dir) {
    if (entry.isDirectory()) {
      server.register(require(`./services/${entry.name}`))
    }
  }
}

module.exports = app
