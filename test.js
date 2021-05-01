/**
 * PREPARE HTTP MOCK SERVER AS OSTICKET ENDPOINT
 */
const http = require('http')

/**
 * 
Status: 201 Created
123456
 */
const requestListener = (req, res) => {
  res.statusCode = 201
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  })
  req.on('end', () => {
    const ticketId = Math.floor(Math.random() * 100000)
    res.end(ticketId.toString())
  })
}
const server = http.createServer(requestListener);
server.listen(8070)


/**
 * TEST SECTION
 */

const expect = require('chai').expect
const ost = require('./index')
ost.init({
  baseUrl: 'http://localhost:8070/',
  apiKey: 'abc-123', 
  apiSecret: 'abc-secret' 
})


describe('Run test', function() {
  this.timeout(15000)

  it('Should create a ticket', async() => {
    const ticket = {
      name: 'Jane Doe',
      email: 'jane.doe@admiralcloud.com',
      subject: 'I need help',
      message: 'This is my bug report'
    }
    let response = await ost.createTicket(ticket)
    expect(response).to.be.a('number')
  })

  it('Try to create a ticket with missing email - should fail', async() => {
    const ticket = {
      name: 'Jane Doe',
      subject: 'I need help',
      message: 'This is my bug report'
    }
    let response = await ost.createTicket(ticket)
    expect(response).to.have.property('message', 'field_email_required')
  })

  it('Should create a ticket and set lock for 5 seconds', async() => {
    const ticket = {
      name: 'Jane Doe',
      email: 'jane.doe@admiralcloud.com',
      subject: 'I need help',
      message: 'This is my bug report'
    }
    const options = {
      key: 'ticketLock',
      expires: 5
    }
    let response = await ost.createTicket(ticket, options)
    expect(response).to.be.a('number')
  })

  it('Try to create a ticket - should be ignored due to lock - return 423', async() => {
    const ticket = {
      name: 'Jane Doe',
      email: 'jane.doe@admiralcloud.com',
      subject: 'I need help',
      message: 'This is my bug report'
    }
    const options = {
      key: 'ticketLock',
      expires: 5
    }
    let response = await ost.createTicket(ticket, options)
    expect(response).to.eql(423)
  })

  it('Wait until lock is released', (done) => {
    setTimeout(done, 5000)
  })

  it('Should create a ticket after lock is released', async() => {
    const ticket = {
      name: 'Jane Doe',
      email: 'jane.doe@admiralcloud.com',
      subject: 'I need help',
      message: 'This is my bug report'
    }
    let response = await ost.createTicket(ticket)
    expect(response).to.be.a('number')
  })

  it('Should create a ticket with DEBUG', async() => {
    const ticket = {
      name: 'Jane Doe',
      email: 'jane.doe@admiralcloud.com',
      subject: 'I need help',
      message: 'This is my bug report'
    }
    let response = await ost.createTicket(ticket, { debug: true })
    expect(response).to.be.a('string')
    expect(response).to.contain('DEBUGMODE')
  })

  it('Should create a ticket with DEBUGMODE as init parameter', async() => {
    ost.init({
      debugMode: true
    })

    const ticket = {
      name: 'Jane Doe',
      email: 'jane.doe@admiralcloud.com',
      subject: 'I need help',
      message: 'This is my bug report'
    }
    let response = await ost.createTicket(ticket)
    expect(response).to.be.a('string')
    expect(response).to.contain('DEBUGMODE')
  })

  it('Try to create a ticket at a non-existing server - should fail', async() => {
    ost.init({
      baseUrl: 'http://localhost:8071/',
      apiKey: 'abc-123',
      debugMode: false
    })

    const ticket = {
      name: 'Jane Doe',
      email: 'jane.doe@admiralcloud.com',
      subject: 'I need help',
      message: 'This is my bug report'
    }
    let response = await ost.createTicket(ticket)
    expect(response).to.be.have.property('code', 'ECONNREFUSED')
  })

 

})