const csvWriter = require('csv-write-stream')
const faker = require('faker')
const from = require('from2-array')
const nes = require('never-ending-stream')
const through = require('through2')
const pumpify = require('pumpify')
const writer = csvWriter()

module.exports = function randoCsv (headers, count) {
  const csvHeaders = []
  const types = {}
  const methods = {}

  headers.forEach((header) => {
    csvHeaders.push(header.name)
    types[header.name] = header.type
    methods[header.name] = header.method
  })

  let row = {}
  let headersCount = csvHeaders.length

  const ts = through.obj((chunk, enc, cb) => {
    const type = types[chunk]
    const method = methods[chunk]
    row[chunk] = faker[type][method]()
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
