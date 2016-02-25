/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the 'License'). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */

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
  b.subscribe(stubEmail, newsletters[0], function(err, resp) {
    t.equal(resp.status, 'ok', 'Should subscribe correctly when passed string');
  })

});

test('subscribe:: invalid email', function (t) {
  t.plan(1);
  b.subscribe('somethingInvalid', newsletters[0], function(err, resp) {
    t.equals(err.message, 'Invalid email address', 'Should return error for invalid email');
  })

});

test('subscribe:: comma list', function (t) {
  t.plan(1);

  b.subscribe(stubEmail, newsletters.join(','), function(err, resp) {
    t.equal(resp.status, 'ok', 'Should subscribe correctly when passed comma delimited list');
  })
});

test('subscribe:: array', function (t) {
  t.plan(1);

  b.subscribe(stubEmail, newsletters, function(err, resp) {
    t.equal(resp.status, 'ok', 'Should subscribe correctly when passed array');
  })
});

test('unsubscribe', function (t) {
  t.plan(1);

  b.unsubscribe(stubEmail, newsletters[0], function(err, resp) {
    t.equal(err.message, '404', 'Should return 404 if no token provided');
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

  b.recover(stubEmail, function(err, resp) {
    t.equal(resp.status, 'ok');
  });
});
