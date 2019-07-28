# OSTicket

Wrapper for OSTicket. At the moment you can only create tickets.

# Installation
```
  yarn add ac-osticket
  npm install ac-osticket --save
```

# Usage
Create API Key in OSTicket and instanciate OSTicket with your OSTicket URL and those API keys.

```
var ost = require('osticket')
var OSTicket = new ost('https://myOSTicketURL', 'APIKEY');

OSTicket.createTicket(data, function(err, res) {
  console.log("ID of the created ticket ", res.body);
});
```


### Create a New Ticket
```
var ticket = {
    "name": "Jane Doe",
    "email": "jane.doe@admiralcloud.com",
    "subject": "I need help",
    "message": "This is my bug report"
};

OSTicket.createTicket(ticket, function(err, res) {
  console.log("ID of the created tickets", res.body);
});
```

## Links
- [Website](https://www.admiralcloud.com/)
- [Twitter (@admiralcloud)](https://twitter.com/admiralcloud)
- [Facebook](https://www.facebook.com/MediaAssetManagement/)

## License
[MIT License](https://opensource.org/licenses/MIT) Copyright © 2009-present, AdmiralCloud, Mark Poepping

# Contributing
This module is inspired by https://github.com/hongkongkiwi/osticket-node and https://github.com/kumarharsh/node-freshdesk

