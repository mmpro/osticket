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
    'description': "Hello, I'm an ephemeral ticket created from the API. I will be deleted as soon as my creator wishes so...",
    'subject': "Efemeros",
    'email': 'efemeros@mailinator.com',
    'priority': '1',
    'status': '2',
};

OSTicket.createTicket(ticket, function(err, res) {
  console.log("ID of the created tickets", res.body);
});
```

# Contributing
This module is inspired by https://github.com/hongkongkiwi/osticket-node and https://github.com/kumarharsh/node-freshdesk

