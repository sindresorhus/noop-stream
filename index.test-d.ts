import {expectType, expectError} from 'tsd';
import {readableNoopStream, writableNoopStream} from '.';

expectType<NodeJS.ReadableStream>(readableNoopStream());
expectType<NodeJS.ReadableStream>(readableNoopStream({size: 10}));
expectType<NodeJS.ReadableStream>(readableNoopStream({size: Infinity}));
expectType<NodeJS.ReadableStream>(readableNoopStream({objectMode: true}));
expectType<NodeJS.WritableStream>(writableNoopStream());
expectType<NodeJS.WritableStream>(writableNoopStream({objectMode: true}));

expectError(readableNoopStream({read: () => {}}));
expectError(writableNoopStream({write: () => {}}));
