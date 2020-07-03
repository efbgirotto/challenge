const fs = require('fs')
const path = require('path')

const Validator = require('./validator')

const Rules = {}

fs.readdirSync(path.resolve(__dirname, './rules'))
  .filter(file => file.endsWith('.js') && !file.endsWith('.spec.js'))
  .forEach((file) => {
    const m = require(`./rules/${file}`)
    Rules[m.name] = m
  })

module.exports = {
  Validator,
  Rules
}
