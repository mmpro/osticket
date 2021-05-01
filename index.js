const _ = require('lodash')
const axios = require('axios')

const keylock = require('ac-keylock')
const sanitizer = require('ac-sanitizer')

const osTicket = () => {

  // PRIVATE
  const apiBaseParams = {
    baseUrl: 'https://osticket.com/',
    headers: {
    //  'Content-Type': 'application/x-www-form-urlencoded',
      'x-api-key': 'abc-123',
    }
  }

  const apiCall = async function(params) {
    let apiParams = {
      method: _.get(params, 'method', 'post'),
      baseURL: _.get(apiBaseParams, 'baseUrl'),
      url: _.get(params, 'url', '/api/tickets.json'),
      headers: _.get(params, 'headers', _.get(apiBaseParams, 'headers')),
      data: _.get(params, 'data')
    }

    try {
      let response = await axios(apiParams)
      return _.get(response, 'data')  
    }
    catch(e) {
      console.log('OSTICKET | Payload | %j', _.pick(apiParams, ['baseURL', 'url', 'data']))
      console.log('OSTICKET | Error | %s | %j', _.get(e, 'code'), _.get(e, 'message'))
      return { code: _.get(e, 'code'), message: _.get(e, 'message') }
    }
  }


  // PUBLIC
  const init = async (params) => {
    _.set(apiBaseParams, 'baseUrl', _.get(params, 'baseUrl'))
    _.set(apiBaseParams, 'headers.x-api-key', _.get(params, 'apiKey'))
    if (_.get(params, 'apiSecret')) {
      _.set(apiBaseParams, 'headers.x-api-auth', _.get(params, 'apiSecret'))
    }
    await keylock.init()
  }
  
  const createTicket = async function(data, options) {
    let fieldsToCheck = {
      params: data,
      fields: [
        { field: 'email', type: 'email', required: true },
        { field: 'name', type: 'string', required: true },
        { field: 'subject', type: 'string', required: true },
        { field: 'message', type: 'string', required: true },
      ],
    }
    let test = sanitizer.checkAndSanitizeValues(fieldsToCheck)
    if (_.get(test, 'error')) return _.get(test, 'error')

    let apiParams = {
      data
    }
    
    if (!_.get(options, 'key')) {
      return await apiCall(apiParams)
    }
    else {
      const lockParams = {
        key: _.get(options, 'key'),
        value: _.get(options, 'value'),
        expires: _.get(options, 'expires')
      }
      let lock = await keylock.lockKey(lockParams)
      if (_.has(lock, 'status')) return _.get(lock, 'status')
      return await apiCall(apiParams)
    }
  }

  return {
    init,
    createTicket
  }
}

module.exports = osTicket()



