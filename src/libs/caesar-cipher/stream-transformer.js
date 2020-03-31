const { Transform } = require('stream');
const { StringDecoder } = require('string_decoder');

class StreamTransformer extends Transform {
  constructor(options) {
    super(options);
    this._decoder = new StringDecoder('utf-8');
    this._encipher = options.encipher;
  }

  _transform(chunk, encoding, callback) {
    if (encoding === 'buffer') {
      chunk = this._decoder.write(chunk);
    }

    // Exit on CTRL + C.
    if (chunk === '\u0003') {
      process.exit(0);
    }

    chunk = chunk.replace(/[A-Za-z]/gi, match => {
      return this._encipher(match);
    });
    // Pass the chunk on.
    callback(null, chunk);
  }
}

module.exports = StreamTransformer;
