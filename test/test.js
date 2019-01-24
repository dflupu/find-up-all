const test = require('ava');
const path = require('path');
const m = require('..');

test('finds file in cwd - async', t => {
	const cwd = 'test/fixtures/1/2';

	return m('a', {cwd, limitDir: cwd}).then(results => {
		const actual = results.map(p => path.relative(cwd, p));
		const expected = ['a'];

		return t.deepEqual(actual, expected);
	});
});

test('finds file above cwd - async', t => {
	const cwd = 'test/fixtures/1/2';
	return m('a', {cwd, limitDir: 'test/fixtures'}).then(results => {
		const actual = results.map(p => path.relative(cwd, p));
		const expected = ['a', '../a', '../../a'];

		return t.deepEqual(actual, expected);
	});
});

test('finds file in cwd - sync', t => {
	const cwd = 'test/fixtures/1/2';
	const actual = m.sync('a', {cwd, limitDir: cwd})
		.map(p => path.relative(cwd, p));

	const expected = ['a'];
	t.deepEqual(actual, expected);
});

test('finds file above cwd - sync', t => {
	const cwd = 'test/fixtures/1/2';
	const actual = m.sync('a', {cwd, limitDir: 'test/fixtures'})
		.map(p => path.relative(cwd, p));

	const expected = ['a', '../a', '../../a'];
	t.deepEqual(actual, expected);
});

test('finds directories', t => {
	const cwd = 'test/fixtures/1/2';
	const actual = m.sync('1', {cwd, limitDir: 'test/fixtures'})
		.map(p => path.relative(cwd, p));

	const expected = ['..'];
	t.deepEqual(actual, expected);
});
