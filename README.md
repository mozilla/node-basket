# node-basket

API wrapper around mozilla's [basket newsletter api](http://basket.readthedocs.org/en/latest/newsletter_api.html)

## Usage

``` javascript
// instantiate
var b = new Basket({BASKET_URL: 'https://basket.mozilla.org'});
b.subscribe('assata@example.com', 'marketplace, beta', function(err, data, resp) {
  console.log(resp.status);
}
```
Methods:
* subscribe - subscribe to newsletters
* unsubscribe - unsubscribe from newsletters
* user - post user info (token required)
* newsletters - return newsletters data
* debugUser - (requires supertoken)
* lookupUser - check if user is on list (requires apikey)
* recover - send user a password recovery email.

## existing work

[python client](http://basket-client.readthedocs.org/en/latest/install.html)

## Who is responsible for this?
- djustice@mozilla.com / [@meandavejustice](https:github.com/meandavejustice]) / JSON_voorhees(irc)

## LICENSE
MPL 2.0
