var qs = require('querystring');
var request = require('request');

module.exports = Basket;

function Basket(opts) {
  this.apikey = opts.API_KEY;
  this.BASKET_URL = opts.BASKET_URL;
  return this;
}

Basket.prototype = {
  subscribe: function (email, newsletters, opts, cb) {
    if (newsletters.join !== undefined) newsletters = newsletters.join(',');
    if (typeof opts === 'function') {
      cb = opts;
    }

    if (!opts || typeof opts !== 'object' ) opts = {email: email, newsletters: newsletters};
    this._post('/news/subscribe/', opts, cb);
    return this;
  },
  unsubscribe: function(email, newsletters, optout, cb) {
    if (newsletters.join !== undefined) newsletters = newsletters.join(',');
    if (typeof optout === 'function') {
      cb = optout;
      optout = false;
    }

   this._post('/news/unsubscribe/', {
      email: email,
      newsletters: newsletters,
      optout: optout
    }, cb);
    return this;
  },
  user: function(email, token, opts, cb) {
    opts = {
      format: '',
      country: '',
      lang: '',
      newsletters: [],
      optin: false,
      email: email
    };
    this._post('/news/user/'+token, opts, cb);
    return this;
  },
  newsletters: function(cb) {
    this._get('/news/newsletters/', cb);
    return this;
  },
  debugUser: function(email, supertoken, cb) {
    this._get('/news/debug-user?' + qs.stringify({
      email: email,
      supertoken: supertoken
    }), cb);
    return this;
  },
  lookupUser: function(email, cb) {
    this._get('/news/lookup-user?' + qs.stringify({
      'api-key': this.apiKey,
      email: email
    }), cb);
    return this;
  },
  recover: function(email, cb) {
    this._post('/news/recover/', {email: email}, cb);
    return this;
  },
  _get: function(url, cb) {
    request.get(this.BASKET_URL+url, function(err, body, resp) {
      return handleError(err, body, resp, cb);
    });
  },
  _post: function(url, form, cb) {
    request.post({url:this.BASKET_URL+url, form: form}, function(err, body, resp) {
      return handleError(err, body, resp, cb);
    });
  }
};

function handleError(err, resp, body, cb) {
  if (err) return cb(err);
  if (resp.statusCode === 404) return cb(new Error(resp.statusCode));
  body = JSON.parse(body);
  if (body.status === 'ok') return cb(null, body);
  if (body.status === 'error') return cb(new Error(body.desc));
}
