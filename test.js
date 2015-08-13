var test = require('tape');
var Basket = require('./index.js');

var stubEmail = 'assata@example.com';
var BASKET_URL = 'https://basket.mozilla.org';
var newsletters = ['marketplace', 'beta']

var b = new Basket({BASKET_URL: BASKET_URL});

test('Basket:: constructor', function(t) {
  t.plan(1);

  var fresh = new Basket({BASKET_URL: BASKET_URL});

  t.equal(typeof fresh.subscribe, 'function', 'Basket Constructor returns correctly');
})

test('subscribe', function (t) {
  t.plan(1);
  b.subscribe(stubEmail, newsletters[0], function(err, data, resp) {
    t.equal(JSON.parse(resp).status, 'ok', 'Should subscribe correctly when passed string');
  })

});

test('subscribe:: comma list', function (t) {
  t.plan(1);

  b.subscribe(stubEmail, newsletters.join(','), function(err, data, resp) {
    t.equal(JSON.parse(resp).status, 'ok', 'Should subscribe correctly when passed comma delimited list');
  })
});

test('subscribe:: array', function (t) {
  t.plan(1);

  b.subscribe(stubEmail, newsletters, function(err, data, resp) {
    t.equal(JSON.parse(resp).status, 'ok', 'Should subscribe correctly when passed array');
  })
});

test('unsubscribe', function (t) {
  t.plan(1);

  b.unsubscribe(stubEmail, newsletters[0], function(err, data, resp) {
    t.equal(data.statusCode, 404, 'Should return 404 if no token provided');
  })
});

test('newsletters', function (t) {
  t.plan(1);

  b.newsletters(function(err, resp) {
    t.equal(resp.status, 'ok');
  });
});

test('recover:: array', function (t) {
  t.plan(1);

  b.recover(stubEmail, function(err, data, resp) {
    t.equal(JSON.parse(resp).status, 'ok');
  });
});
