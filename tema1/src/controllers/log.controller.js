import Log from '../models/log'
import APIError from '../helpers/APIErrorHelper'
import httpStatus from 'http-status'
import { catchErrors } from '../helpers/errorHelpers'
import _ from 'lodash'
import request from 'request'
import config from '../config'

export async function getMetrics (req, res) {
  let logs = []
  let resp = {}
  let err
  try {
    logs = await Log.find({})
    logs = JSON.parse(JSON.stringify(logs))
    for (let i = 0; i < logs.length; i++) {
      if (!resp[logs[i].requestName]) {
        resp[logs[i].requestName] = {}
        resp[logs[i].requestName].url = logs[i].requestName
        resp[logs[i].requestName].socket = 0
        resp[logs[i].requestName].lookup = 0
        resp[logs[i].requestName].connect = 0
        resp[logs[i].requestName].response = 0
        resp[logs[i].requestName].end = 0
      }
      resp[logs[i].requestName].socket += logs[i].socket
      resp[logs[i].requestName].lookup += logs[i].lookup
      resp[logs[i].requestName].connect += logs[i].connect
      resp[logs[i].requestName].response += logs[i].response
      resp[logs[i].requestName].end += logs[i].end
    }
  } catch (e) {
    console.log(e)
    err = new APIError('Error while creating the statistics', httpStatus.UNPROCESSABLE_ENTITY)
    err = catchErrors(err)
  }

  !_.isEmpty(err) ? res.writeHead(422, { 'Content-Type': 'application/json' }) : res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(_.isEmpty(err) ? JSON.stringify(resp) : JSON.stringify(err))
  res.end()
}

export async function requestAPIs (req, res) {
  let err
  try {
    let url = `https://restcountries.eu/rest/v2/name/${req.reqUrl.query.country}`
    request.get({
      url: url,
      time: true
    }, async function (error, response, responseBody) {
      if (error) { console.log(error) }
      await Log.create({
        requestName: url,
        result: responseBody,
        ...response.timings
      })
      let url1 = `http://api.openweathermap.org/data/2.5/weather?q=${JSON.parse(responseBody)[0].capital}&appid=${config.weather_key}`
      request.get({
        url: url1,
        time: true
      }, async function (error, response, responseBody) {
        if (error) { console.log(error) }
        await Log.create({
          requestName: url1,
          result: responseBody,
          ...response.timings
        })
        responseBody = JSON.parse(responseBody)
        let weather = `Weather is ${responseBody.weather[0].main}. More details: ${responseBody.weather[0].description}.`
        let url3 = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${config.translate_key}&text=${weather}&lang=en-ro`
        request.post({
          url: url3,
          time: true
        }, async function (error, response, body) {
          if (error) { console.log(error) }
          await Log.create({
            requestName: url3,
            result: body,
            ...response.timings
          })
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.write(JSON.stringify(body))
          res.end()
        })
      })
    })
  } catch (e) {
    err = new APIError('Error while creating the log!', httpStatus.UNPROCESSABLE_ENTITY)
    err = catchErrors(err)
    console.log(err)
  }
}
