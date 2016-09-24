# OSTicket

Wrapper for OSTicket. At the moment you can only create tickets.

# Installation
```
  npm install git@github.com:mmpro/osticket-node.git
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


### Create a New TIcket
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

# Contributing
This module is inspired by https://github.com/hongkongkiwi/osticket-node and https://github.com/kumarharsh/node-freshdesk

