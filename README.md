# rando-csv
Create a bunch of csv data

## Install

`npm i rando-csv`

## Use

```javascript
const fs = require('fs')
const randoCsv = require('rando-csv')
const ws = fs.createWriteStream('./example.csv')
randoCsv([
  {
    name: 'Name',
    type: 'name',
    method: 'firstName'
  },
  {
    name: 'Phone',
    type: 'phone',
    method: 'phoneNumber'
  }
]).pipe(ws)
```

`rando-csv` takes a collection of header definitions where type and method are [`faker`](https://www.npmjs.com/package/faker) methods. For example, if you wanted fake food images `{ name: 'Food', type: 'image', method: 'food' }`. It returns a stream, so you can listen to `data` events or `pipe` it somewhere.

## [COC](CODE_OF_CONDUCT.md)

## [Contributing](CONTRIBUTING.md)
