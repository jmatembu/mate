// Test that a value is returned without any symbols
QUnit.test('is without symbols', function( assert ) {
  assert.equal(mate.withoutSymbols('!hello?'), 'hello', 'All symbols have been removed');
  assert.equal(mate.withoutSymbols(''), '', 'Returns empty string as is.');
  assert.equal(mate.withoutSymbols(null), 'null', 'The string null is returned.');
  assert.equal(mate.withoutSymbols(undefined), 'undefined', 'The string undefined is returned');
  assert.equal(mate.withoutSymbols(123), '123', 'The string 123 is returned');
  assert.throws(function () { 
  	mate.withoutSymbols();
  }, 'Function requires 1 parameter, 0 given');
});

// Test that a value is empty
QUnit.test('is empty', function (assert) {
	assert.ok(mate.isEmpty(0), '0 is empty, return true');
	assert.ok(mate.isEmpty(''), '"" is empty, return true');
	assert.ok(mate.isEmpty(null), 'null is empty, return true');
	assert.ok(mate.isEmpty(undefined), 'undefined is empty, return true');
	assert.ok(mate.isEmpty(NaN), 'NaN is empty, return true');
	assert.ok(mate.isEmpty({}), '{} is empty, return true');
	assert.notOk(mate.isEmpty({a: '1'}), '{a: 1} is not empty, return false');
	assert.notOk(mate.isEmpty('hello'), '"hello" is not empty, return false');
	assert.notOk(mate.isEmpty(1), '1 is not empty, return false');
	assert.notOk(mate.isEmpty(123), '123 is not empty, return false');
	assert.notOk(mate.isEmpty(function () {} ), 'callback is not empty, return false');
});

// Test that a value is an object
QUnit.test('is an object', function (assert) {
	assert.ok(mate.isObject(function () {}), 'Function is an object.');
	assert.ok(mate.isObject({}), '{} is an object');
	assert.notOk(mate.isObject('hello'), 'hello is not an object');
	assert.notOk(mate.isObject(1234), '1234 is not an object');
});

// Checks if the input text parameter contains one or more of the words within the words array
QUnit.test('word is in array of words', function (assert) {
	assert.notOk(mate.contains('Visiting new places is fun.', ['coconut']), 'coconut doesn\'t exists in sentence, return false');
	assert.notOk(mate.contains('Visiting new places is fun.', ['ace']), 'ace doesn\'t exists in sentence, return false');
	assert.ok(mate.contains('Visiting new places is fun.', ['places']), 'places exists in sentence, return true');
	assert.ok(mate.contains('"Definitely," he said in a matter-of-fact tone.', ['matter', 'definitely']), '"matter" and "definitely" exist in sentence, return true');
	assert.throws(function () {
		mate.contains();
	}, 'Function requires 2 parameters, 0 given');
	assert.throws(function () {
		mate.contains('Visiting new places is fun.');
	}, 'Function requires 2 parameters, 1 given');
});