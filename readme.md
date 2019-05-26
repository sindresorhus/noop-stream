# noop-stream [![Build Status](https://travis-ci.com/sindresorhus/noop-stream.svg?branch=master)](https://travis-ci.com/sindresorhus/noop-stream)

> Create a readable Node.js stream that produces no data (or optionally blank data) or a writable stream that discards data

This can be useful for testing, fixtures, draining a stream, etc.

It's like `/dev/null` but cross-platform.


## Install

```
$ npm install noop-stream
```


## Usage

```js
const stream = require('stream');
const {readableNoopStream} = require('noop-stream');

stream.pipeline(readableNoopStream({size: 10}), process.stdout);
```

```js
const stream = require('stream');
const {writableNoopStream} = require('noop-stream');

stream.pipeline(process.stdin, writableNoopStream());
```


## API

### readableNoopStream(options?)

Create a readable Node.js stream that produces no data (or optionally blank data).

Options are passed to the [`stream.Readable` constructor](https://nodejs.org/api/stream.html#stream_new_stream_readable_options), except for the `read` option.

You can also specify a `size` option, which is the size in bytes to produce. By default, it's `0`. Set it to `Infinity` to make it produce data until you manually destroy the stream.

### writableNoopStream(options?)

Create a writable Node.js stream that discards received data.

Options are passed to the [`stream.Writable` constructor](https://nodejs.org/api/stream.html#stream_constructor_new_stream_writable_options), except for the `write` option.


## Related

- [dev-null-cli](https://github.com/sindresorhus/dev-null-cli) - Cross-platform `/dev/null`
- [random-bytes-readable-stream](https://github.com/sindresorhus/random-bytes-readable-stream) - Creates a readable stream producing cryptographically strong pseudo-random data
