import config from './config'
import http from 'http'
import mongoose from './mongoose'
import * as MetricsController from './controllers/log.controller'
import url from 'url'
import { renderFile } from './helpers/renderFile'

process.on('uncaughtException', function (err) {
  console.log(err)
})

let db = mongoose.connection
db.on('error', () => {
  console.error('Error! Cannot connect to database!')
})
db.once('open', () => {
  console.log('Connected to database')
})

http.createServer(async function (req, res) {
  req.reqUrl = url.parse(req.url, true)
  switch (req.reqUrl.pathname) {
    case `/api/logs`:
      if (req.method === 'GET') {
        await MetricsController.requestAPIs(req, res)
      }
      break
    case `/metrics`:
      if (req.method === 'GET') {
        await MetricsController.getMetrics(req, res)
      }
      break
    default:
      renderFile(req, res)
  }
}).listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}/ (${config.env})`)
})
