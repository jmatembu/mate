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
QUnit.test('words are in array of words', function (assert) {
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

// Checks if the input text parameter does not contain any of the words within the words array
QUnit.test('words are not in array of words', function (assert) {
	assert.ok(mate.lacks('Visiting new places is fun.', ['coconut']), 'coconut doesn\'t exists in sentence, return true');
	assert.ok(mate.lacks('Visiting new places is fun.', ['ace']), 'ace doesn\'t exists in sentence, return true');
	assert.notOk(mate.lacks('Visiting new places is fun.', ['places']), 'places exists in sentence, return false');
	assert.notOk(mate.lacks('"Definitely," he said in a matter-of-fact tone.', ['matter', 'definitely']), '"matter" and "definitely" exist in sentence, return false');
	assert.throws(function () {
		mate.lacks();
	}, 'Function requires 2 parameters, 0 given');
	assert.throws(function () {
		mate.lacks('Visiting new places is fun.');
	}, 'Function requires 2 parameters, 1 given');
});

// Checks that the input text parameter contains only strings found within the strings array.
QUnit.test('string is within the strings array', function (assert) {
	assert.ok(mate.isComposedOf("10184", ["1", "2", "3", "4", "5", "6" ,"7", "8", "9", "0"]), '10184 is within array of strings');
	assert.ok(mate.isComposedOf("I am ready.", ["I", "I'm", "am", "not", "ready"]), '"I am ready" is array of strings');
	assert.ok(mate.isComposedOf("Iamnotready.", ["I", "I'm", "am", "not", "ready"]), 'Returns true');
	assert.ok(mate.isComposedOf("applesound", ["apples", "sound"]), 'Returns true');
	assert.notOk(mate.isComposedOf("foobarbaz", ["foo", "bar"]), 'Returns false');
	assert.ok(mate.isComposedOf("fooamazonFOO", ['Foo', 'Amazon']), 'Returns true');
	assert.throws(function () {
		mate.isComposedOf();
	}, 'Function requires 2 parameters, 0 given');
	assert.throws(function () {
		mate.isComposedOf('Visiting new places is fun.');
	}, 'Function requires 2 parameters, 1 given');
});

// Checks if the input parameter’s character count is less than or equal to the n parameter.
QUnit.test('is length', function (assert) {
	assert.notOk(mate.isLength("123456789", 6), 'Returns false');
	assert.ok(mate.isLength("123456789", 20));
	assert.ok(mate.isLength("AHHHH", 25));
	assert.throws(function () {
		mate.isLength();
	}, 'Function requires 2 parameters, 0 given');
	assert.throws(function () {
		mate.isLength('123456789');
	}, 'Function requires 2 parameters, 1 given');
});