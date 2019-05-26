/// <reference types="node"/>
import {
	ReadableOptions as ReadableStreamOptions,
	WritableOptions as WritableStreamOptions
} from 'stream';
import {Omit} from 'type-fest';

declare namespace readableNoopStream {
	interface Options extends Omit<ReadableStreamOptions, 'read'> {
		/**
		The amount of data to stream in bytes.

		Set it to `Infinity` to make it produce data until you manually destroy the stream.

		@default 0
		*/
		readonly size?: number;
	}
}

/**
Create a readable Node.js stream that produces no data (or optionally blank data).

@example
```
import stream from 'stream';
import {readableNoopStream} from 'noop-stream';

stream.pipeline(readableNoopStream({size: 10}), process.stdout);
```
*/
export function readableNoopStream(options?: readableNoopStream.Options): NodeJS.ReadableStream;

declare namespace writableNoopStream {
	interface Options extends Omit<WritableStreamOptions, 'write'> {}
}

/**
Create a writable Node.js stream that discards received data.

@example
```
import stream from 'stream';
import {writableNoopStream} from 'noop-stream';

stream.pipeline(process.stdin, writableNoopStream());
```
*/
export function writableNoopStream(options?: writableNoopStream.Options): NodeJS.WritableStream;
