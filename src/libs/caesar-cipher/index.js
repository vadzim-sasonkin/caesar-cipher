const fs = require('fs');
const StreamTransformer = require('./stream-transformer');
const caesarCipher = require('./cipher');
const { pipeline } = require('stream');
const { actions } = require('./constants');
const controlArgs = require('./parseArgs');

const argv = require('minimist')(process.argv.slice(2), {
  alias: { a: ['action'], s: ['shift'], i: ['input'], o: ['output'] },
  strings: 'shift'
});

function run(action, shift, input, output) {
  const inStream = input ? fs.createReadStream(input) : process.stdin;
  const outStream = output ? fs.createWriteStream(output) : process.stdout;

  const streamTransformer = new StreamTransformer({
    encipher: char => caesarCipher(char, shift, action === actions.DECODE)
  });

  pipeline(inStream, streamTransformer, outStream, err => {
    if (err) {
      console.error('Fail', err);
    } else {
      console.log('Success');
    }
  });
}
try {
  controlArgs(argv);
  const { action, shift, input, output } = argv;
  console.log(argv);
  run(action, shift, input, output);
} catch (error) {
  console.error(error);
  process.exit(1);
}
