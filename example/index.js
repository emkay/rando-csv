const randoCsv = require('..')
const fs = require('fs')
const ws = fs.createWriteStream('./example.csv')

randoCsv([
  {
    name: 'Date',
    type: 'date',
    method: 'recent'
  },
  {
    name: 'Number',
    type: 'random',
    method: 'number'
  },
  {
    name: 'Name',
    type: 'name',
    method: 'firstName'
  },
  {
    name: 'City',
    type: 'address',
    method: 'city'
  }
], 20000).pipe(ws)
