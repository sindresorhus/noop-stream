import {promisify} from 'util';
import Stream from 'stream';
import fs from 'fs';
import test from 'ava';
import getStream from 'get-stream';
import {readableNoopStream, writableNoopStream} from '.';

test('readableNoopStream - 0 KB', async t => {
	const data = await getStream(readableNoopStream());
	t.is(data.length, 0);
});

test('readableNoopStream - 1 KB', async t => {
	const size = 1000 * 1000;
	const data = await getStream(readableNoopStream({size}));
	t.is(data.length, size);
});

test('readableNoopStream - Infinity', async t => {
	const stream = readableNoopStream({size: Infinity});

	setTimeout(() => {
		// TODO: Use `stream.destroy();` when https://github.com/sindresorhus/get-stream/issues/33 is fixed
		stream.emit('end');
	}, 200);

	const data = await getStream(stream);
	t.true(data.length > 0);
});

// TODO: Remove the if-statement when targeting Node.js 10
if (Stream.pipeline && Stream.finished) {
	const streamPipeline = promisify(Stream.pipeline);
	const streamFinished = promisify(Stream.finished);

	test('writableNoopStream', async t => {
		// I'm using plain `.pipe()` here to ensure it works too
		const stream = readableNoopStream({size: 1000}).pipe(writableNoopStream());
		await t.notThrowsAsync(streamFinished(stream));
	});

	test('writableNoopStream - fs stream', async t => {
		const stream = streamPipeline(fs.createReadStream('package.json'), writableNoopStream());
		await t.notThrowsAsync(stream);
	});
}
