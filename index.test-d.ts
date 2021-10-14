import {expectType, expectError} from 'tsd';
import {readableNoopStream, writableNoopStream} from './index.js';

expectType<NodeJS.ReadableStream>(readableNoopStream());
expectType<NodeJS.ReadableStream>(readableNoopStream({size: 10}));
expectType<NodeJS.ReadableStream>(readableNoopStream({size: Number.POSITIVE_INFINITY}));
expectType<NodeJS.ReadableStream>(readableNoopStream({objectMode: true}));
expectType<NodeJS.WritableStream>(writableNoopStream());
expectType<NodeJS.WritableStream>(writableNoopStream({objectMode: true}));

expectError(readableNoopStream({read: () => {}})); // eslint-disable-line @typescript-eslint/no-empty-function
expectError(writableNoopStream({write: () => {}})); // eslint-disable-line @typescript-eslint/no-empty-function
