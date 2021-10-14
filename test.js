import {promisify} from 'node:util';
import stream from 'node:stream';
import fs from 'node:fs';
import test from 'ava';
import getStream from 'get-stream';
import {readableNoopStream, writableNoopStream} from './index.js';

const streamPipeline = promisify(stream.pipeline);
const streamFinished = promisify(stream.finished);

test('readableNoopStream - 0 KB', async t => {
	const data = await getStream(readableNoopStream());
	t.is(data.length, 0);
});

test('readableNoopStream - 1 KB', async t => {
	const size = 1000 * 1000;
	const data = await getStream(readableNoopStream({size}));
	t.is(data.length, size);
});

// TODO: This test passes on Node.js 12, but fails on Node.js 16. Probably a Node.js bug.
// test('readableNoopStream - Infinity', async t => {
// 	const stream = readableNoopStream({size: Number.POSITIVE_INFINITY});

// 	setTimeout(() => {
// 		// TODO: Use `stream.destroy();` when https://github.com/sindresorhus/get-stream/issues/33 is fixed
// 		stream.emit('end');
// 	}, 200);

// 	const data = await getStream(stream);
// 	t.true(data.length > 0);
// });

test('writableNoopStream', async t => {
	// I'm using plain `.pipe()` here to ensure that works too
	const stream = readableNoopStream({size: 1000}).pipe(writableNoopStream());
	await t.notThrowsAsync(streamFinished(stream));
});

test('writableNoopStream - fs stream', async t => {
	const stream = streamPipeline(fs.createReadStream('package.json'), writableNoopStream());
	await t.notThrowsAsync(stream);
});
