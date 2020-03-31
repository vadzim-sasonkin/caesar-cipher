const { actions } = require('./constants');

function checkActionParam(action) {
  if (Object.values(actions).indexOf(action) === -1) {
    throw new Error("Action should be either 'decode' or 'encode'");
  }
}
function checkShiftParam(shift) {
  if (!Number.isInteger(Number(shift))) {
    throw new Error('Shift should be integer');
  }
}
function controlArgs(args) {
  checkActionParam(args.a);
  checkShiftParam(args.s);
}

module.exports = controlArgs;
