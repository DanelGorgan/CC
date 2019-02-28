let async = require('async')
let request = require('request')

function generateRandomValues () {
  let values = ['romania', 'United Kingdom', 'turkey', 'sweden']
  let response = []
  for (let i = 0; i < 50; i++) {
    response.push(values[Math.floor(Math.random() * values.length)])
  }
  return response
}

let nrRequests = 50

function makeCalls () {
  let r = generateRandomValues()
  async.eachLimit(r, 50, function (param, eachCb) {
    let url = `http://localhost:8081/api/logs?country=${param}`
    console.log(param)
    request.get({
      url: url,
      time: true
    }, async function (error, response, responseBody) {
      if (error) { console.log(error) }
      console.log(responseBody)
      eachCb(null)
    })
  }, function (err) {
    if (err) console.error(err.message)
    console.log(nrRequests)
    nrRequests--
    if (nrRequests === 0) {
      process.exit(0)
    }
    makeCalls()
  })
}

makeCalls()