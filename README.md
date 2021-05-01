# OSTicket

Wrapper for OSTicket. At the moment you can only create tickets.

ATTENTION: Version 2 no longer supports callbacks. Please use async/await.

# Installation
```
  yarn add ac-osticket
  npm install ac-osticket --save
```

# Usage
Create API Key in OSTicket and instanciate OSTicket with your OSTicket URL and those API keys.

```
const ost = require('osticket')
ost.init({
  baseUrl: 'https://myOSTicketURL',
  apikey: 'abc-123', 
  apiSecret: 'abc-secret' // optional if you have tweaked OSTicket
})

// see below for payload
let ticketId = await ost.createTicket(ticket)
```


### Create a New Ticket
```
const ticket = {
    "name": "Jane Doe",
    "email": "jane.doe@admiralcloud.com",
    "subject": "I need help",
    "message": "This is my bug report"
}

let ticketId = await ost.createTicket(ticket)
```

## Links
- [Website](https://www.admiralcloud.com/)
- [Twitter (@admiralcloud)](https://twitter.com/admiralcloud)
- [Facebook](https://www.facebook.com/MediaAssetManagement/)

## License
[MIT License](https://opensource.org/licenses/MIT) Copyright © 2009-present, AdmiralCloud AG, Mark Poepping

# Contributing
This module is inspired by https://github.com/hongkongkiwi/osticket-node and https://github.com/kumarharsh/node-freshdesk

