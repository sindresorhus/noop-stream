import {
	ReadableOptions as ReadableNodeStreamOptions,
	WritableOptions as WritableNodeStreamOptions,
} from 'node:stream';

export interface ReadableStreamOptions extends Omit<ReadableNodeStreamOptions, 'read'> {
	/**
	The amount of data to stream in bytes.

	Set it to `Infinity` to make it produce data until you manually destroy the stream.

	@default 0
	*/
	readonly size?: number;
}

export interface WritableStreamOptions extends Omit<WritableNodeStreamOptions, 'write'> {}

/**
Create a readable Node.js stream that produces no data (or optionally blank data).

@example
```
import stream from 'stream';
import {readableNoopStream} from 'noop-stream';

stream.pipeline(readableNoopStream({size: 10}), process.stdout);
```
*/
export function readableNoopStream(options?: ReadableStreamOptions): NodeJS.ReadableStream;

/**
Create a writable Node.js stream that discards received data.

@example
```
import stream from 'stream';
import {writableNoopStream} from 'noop-stream';

stream.pipeline(process.stdin, writableNoopStream());
```
*/
export function writableNoopStream(options?: WritableStreamOptions): NodeJS.WritableStream;
