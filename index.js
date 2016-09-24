var _ = require('lodash');
var url = require('url');
var request = require('request-promise');


const bind = function(fn, me){
  return function(){
    return fn.apply(me, arguments);
  };
};


var OSTicket;

OSTicket = (function() {
  function OSTicket(url, apikey) {
    this.url = url;

    this.createTicket = bind(this.createTicket, this);

    this["delete"] = bind(this["delete"], this);
    this.put = bind(this.put, this);
    this.post = bind(this.post, this);
    this.get = bind(this.get, this);

    var defaultHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-API-Key': apikey,
    };

    this.r = request.defaults({
      headers: defaultHeaders
    });
  }

  OSTicket.prototype.get = function(path, cb) {
    return this.r.get({
      url: "" + this.url + path
    }, cb);
  };

  OSTicket.prototype.post = function(path, data, cb) {
    return this.r.post({
      url: "" + this.url + path,
      json: data
    }, cb);
  };

  OSTicket.prototype.put = function(path, data, cb) {
    return this.r.put({
      url: "" + this.url + path,
      json: data
    }, cb);
  };

  OSTicket.prototype["delete"] = function(path, cb) {
    return this.r.del({
      url: "" + this.url + path
    }, cb);
  };

  OSTicket.prototype.validate = function(params) {
    let requiredFields = params.requiredFields;
    let dataToValidate = params.data;

    let err;
    _.each(requiredFields, function(field) {
      if (!_.has(dataToValidate, field)) err = field + '_missing';
    });
    return err;
  };



  /**
   *
   * @param data
   * @param cb (err, new ticket id)
   */
  OSTicket.prototype.createTicket = function(data, cb) {

    let requiredFields = ["email", "name", "subject", "message"];
    let validate = this.validate({ requiredFields: requiredFields, data: data });
    if (validate) return cb(validate);

    return this.post('/api/tickets.json', data, cb);
  };

  return OSTicket;

})();

module.exports = OSTicket;
