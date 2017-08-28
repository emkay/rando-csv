const csvWriter = require('csv-write-stream')
const faker = require('faker')
const from = require('from2-array')
const nes = require('never-ending-stream')
const through = require('through2')
const pumpify = require('pumpify')

module.exports = function randoCsv (headers, count, options) {
  const writer = csvWriter(options)
  
  const csvHeaders = []
  const types = {}
  const methods = {}
  const args = {}
  
  headers.forEach((header) => {
    csvHeaders.push(header.name)
    types[header.name] = header.type
    methods[header.name] = header.method
    args[header.name] = header.args
  })

  let row = {}
  let headersCount = csvHeaders.length

  const ts = through.obj((chunk, enc, cb) => {
    const type = types[chunk]
    const method = methods[chunk]
    const arg = args[chunk]
    row[chunk] = faker[type][method](arg)
    headersCount -= 1
    if (headersCount === 0) {
      ts.push(row)
      headersCount = csvHeaders.length
    }
    cb()
  })

  const ss = nes.obj(() => {
    if (count === 0) return null
    count -= 1
    return from.obj(csvHeaders)
  })

  return pumpify.obj(ss, ts, writer)
}
