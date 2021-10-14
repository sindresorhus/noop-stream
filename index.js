import {
	Readable as ReadableStream,
	Writable as WritableStream,
} from 'node:stream';
import {Buffer} from 'node:buffer';

export function readableNoopStream({size = 0, ...options} = {}) {
	let producedSize = 0;

	return new ReadableStream({
		...options,
		read(readSize) {
			let shouldEnd = false;

			if ((producedSize + readSize) >= size) {
				readSize = size - producedSize;
				shouldEnd = true;
			}

			setImmediate(() => {
				if (size === 0) {
					this.push(null);
				}

				producedSize += readSize;
				this.push(Buffer.alloc(readSize));

				if (shouldEnd) {
					this.push(null);
				}
			});
		},
	});
}

export function writableNoopStream(options) {
	return new WritableStream({
		...options,
		write(chunk, encding, callback) {
			setImmediate(callback);
		},
	});
}
